export const getUserDetailsQueryBody = (id: string): string =>
    JSON.stringify({
        query: `
                query favoriteDetailV2($favoriteSlug: String!) {
                  favoriteDetailV2(favoriteSlug: $favoriteSlug) {
                    coverUrl
                    coverEmoji
                    coverBackgroundColor
                    description
                    creator {
                      realName
                      userAvatar
                      userSlug
                    }
                    hasCurrentQuestion
                    isPublicFavorite
                    lastQuestionAddedAt
                    name
                    questionNumber
                    slug
                    isDefaultList
                  }
                }
              `,
        variables: { favoriteSlug: id },
        operationName: "favoriteDetailV2",
    });

export const getQuestionListQueryBody = (id: string) =>
    JSON.stringify({
        query: `
    query favoriteQuestionList($favoriteSlug: String!) {
      favoriteQuestionList(favoriteSlug: $favoriteSlug) {
        questions {
          difficulty
          id
          paidOnly
          questionFrontendId
          status
          title
          titleSlug
          translatedTitle
          isInMyFavorites
          topicTags {
            name
            nameTranslated
            slug
          }
        }
      }
    }
  `,
        variables: { favoriteSlug: id },
        operationName: "favoriteQuestionList",
    });
