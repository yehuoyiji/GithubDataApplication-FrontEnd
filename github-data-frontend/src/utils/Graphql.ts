const API_URL = "https://api.github.com/graphql";
const TOKEN = "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";  // 替换为你的 GitHub 访问令牌

// GraphQL 查询：获取总 PR 数量
const getTotalPRsQuery = (username: string) => {
    return `
  query {
    search(query: "author:${username} is:pr", type: ISSUE, first: 100) {
      edges {
        node {
          ... on PullRequest {
            id
          }
        }
      }
    }
  }
  `;
};

// GraphQL 查询：获取用户所有仓库的 Star 数
const getRepositoriesQuery = (username: string) => {
    return `
  query {
    user(login: "${username}") {
      repositories(first: 100) {
        edges {
          node {
            name
            stargazerCount
          }
        }
      }
    }
  }
  `;
};

// GraphQL 查询：获取用户所有仓库的提交数
const getCommitContributionsQuery = (username: string) => {
    return `
  query {
    user(login: "${username}") {
      contributionsCollection {
        commitContributionsByRepository {
          repository {
            name
          }
          contributions {
            totalCount
          }
        }
      }
    }
  }
  `;
};

// GraphQL 查询：获取指出问题的 Issue 数量
const getIssuesQuery = (username: string) => {
    return `
  query {
    search(query: "author:${username} is:issue", type: ISSUE, first: 100) {
      edges {
        node {
          ... on Issue {
            id
          }
        }
      }
    }
  }
  `;
};

// GraphQL 查询：获取去年的贡献
const getContributionsLastYearQuery = (username: string, fromDate: string, toDate: string) => {
    return `
  query {
    user(login: "${username}") {
      contributionsCollection(from: "${fromDate}", to: "${toDate}") {
        commitContributionsByRepository {
          repository {
            name
          }
          contributions {
            totalCount
          }
        }
        pullRequestContributionsByRepository {
          repository {
            name
          }
          contributions {
            totalCount
          }
        }
        issueContributionsByRepository {
          repository {
            name
          }
          contributions {
            totalCount
          }
        }
      }
    }
  }
  `;
};

// 发送请求到 GitHub GraphQL API
const fetchData = async (query: string) => {
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

// 计算增减百分比
const calculatePercentageChange = (current: number, previous: number) => {
    if (previous === 0) return 100; // 防止除以零
    return ((current - previous) / previous) * 100;
};

// 获取用户统计信息
const getUserStatistics1 = async (username: string) => {
    try {
        // 获取总 PR 数量
        const totalPRQuery = getTotalPRsQuery(username);
        const totalPRData = await fetchData(totalPRQuery);
        const totalPRCount = totalPRData.search.edges.length;

        // 获取总 Star 数量
        const repositoriesQuery = getRepositoriesQuery(username);
        const repositoriesData = await fetchData(repositoriesQuery);
        const totalStars = repositoriesData.user?.repositories.edges.reduce((acc: number, repo: any) => acc + repo.node.stargazerCount, 0);

        // 获取提交数
        const commitQuery = getCommitContributionsQuery(username);
        const commitData = await fetchData(commitQuery);
        const totalCommits = commitData.user?.contributionsCollection.commitContributionsByRepository
            .reduce((acc: number, repo: any) => acc + repo.contributions.totalCount, 0);

        // 获取指出问题的 Issue 数量
        const issuesQuery = getIssuesQuery(username);
        const issuesData = await fetchData(issuesQuery);
        const totalIssues = issuesData.search.edges.length;

        // 获取去年贡献数据
        const lastYearStart = new Date();
        lastYearStart.setFullYear(lastYearStart.getFullYear() - 1);
        const lastYearEnd = new Date();
        lastYearEnd.setFullYear(lastYearEnd.getFullYear() - 1, 11, 31);

        const contributionsLastYearQuery = getContributionsLastYearQuery(username, lastYearStart.toISOString(), lastYearEnd.toISOString());
        const lastYearData = await fetchData(contributionsLastYearQuery);
        const totalCommitsLastYear = lastYearData.user?.contributionsCollection.commitContributionsByRepository
            .reduce((acc: number, repo: any) => acc + repo.contributions.totalCount, 0);
        const totalPRsLastYear = lastYearData.user?.contributionsCollection.pullRequestContributionsByRepository
            .reduce((acc: number, repo: any) => acc + repo.contributions.totalCount, 0);
        const totalIssuesLastYear = lastYearData.user?.contributionsCollection.issueContributionsByRepository
            .reduce((acc: number, repo: any) => acc + repo.contributions.totalCount, 0);

        return {
            totalStars,
            totalCommits,
            totalPRCount,
            totalIssues,
            totalCommitsLastYear,
            totalPRsLastYear,
            totalIssuesLastYear
        };
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
};

// 示例调用
// const username = "your_username";  // 替换为目标 GitHub 用户名
// getUserStatistics(username).then(stats => {
//     console.log(stats);
// });
export default getUserStatistics1;
