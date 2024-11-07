import Graphql from "@/utils/Graphql";

const API_URL = "https://api.github.com/graphql";
const TOKEN = "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";

const getUserRelationsQuery = (username: string) => {
    return `
  query {
    user(login: "${username}") {
      followers(first: 100) {
        edges {
          node {
            location
          }
        }
      }
      following(first: 100) {
        edges {
          node {
            location
          }
        }
      }
      repositories(first: 100) {
        edges {
          node {
            name
            owner {
              login
            }
          }
        }
      }
    }
  }
  `;
};

const fetchUserRelationsData = async (username: string) => {
    const query = getUserRelationsQuery(username);
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `bearer ${TOKEN}`,
        },
        body: JSON.stringify({ query }),
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    const data = await response.json();
    return data.data;
};

type LocationCount = {
    [key: string]: number;
};

const inferLocationFromRelations = async (username: string) => {
    try {
        const data = await fetchUserRelationsData(username);
        const followersLocations = data.user.followers.edges.map((edge: any) => edge.node.location).filter((location: string) => location);
        const followingLocations = data.user.following.edges.map((edge: any) => edge.node.location).filter((location: string) => location);

        // 合并 followers 和 following 的位置
        const allLocations = [...followersLocations, ...followingLocations];

        // 对位置进行频率统计，推测出用户的位置
        const locationCount: LocationCount = allLocations.reduce((acc: LocationCount, location: string) => {
            acc[location] = (acc[location] || 0) + 1;
            return acc;
        }, {});

        // 按频率排序位置
        const sortedLocations = Object.entries(locationCount).sort((a, b) => b[1] - a[1]);

        const inferredLocation = sortedLocations.length > 0 ? sortedLocations[0][0] : "Unknown";

        return inferredLocation;
    } catch (error) {
        console.error("Error fetching user relations:", error);
    }
};

// 使用示例
export default inferLocationFromRelations;
