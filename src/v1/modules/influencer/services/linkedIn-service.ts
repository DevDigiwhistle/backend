// import { HttpException } from '../../../../utils'
// import { IAxiosService } from '../../../utils'
// import { ILinkedInService } from '../interface'

// class LinkedInService implements ILinkedInService {
//   private static instance: ILinkedInService | null = null
//   private readonly axiosService: IAxiosService

//   static getInstance = (axiosService: IAxiosService) => {
//     if (LinkedInService.instance === null) {
//       LinkedInService.instance = new LinkedInService(axiosService)
//     }
//     return LinkedInService.instance
//   }

//   private constructor(axiosService: IAxiosService) {
//     this.axiosService = axiosService
//   }

//   async getLinkedInProfileStats(profileURL: string): Promise<any> {
//     try {
//       const headers = {
//         'x-rapidapi-host': 'instagram-statistics-api.p.rapidapi.com',
//         'x-rapidapi-key': process.env.LINKEDIN_API_KEY,
//         'Content-Type': 'application/json',
//       }

//       const [personData, posts] = await Promise.all([
//         this.axiosService.post(
//           `https://linkedin-bulk-data-scraper.p.rapidapi.com/person`,
//           { link: profileURL },
//           headers
//         ),
//         this.axiosService.post(
//           `https://linkedin-bulk-data-scraper.p.rapidapi.com/profile_posts_all`,
//           { link: profileURL },
//           headers
//         ),
//       ])

//       const _posts = posts.data
//       let likes = 0,
//         comments = 0,
//         shares = 0

//       _posts.forEach((item: any) => {
//         likes += item.socialCount.numLikes
//         comments += item.socialCount.numComments
//         shares += item.socialCount.numShares
//       })

//       const avgLikes = Math.floor(likes / posts.total)
//       const avgComments = Math.floor(comments / posts.total)
//       const avgShares = Math.floor(shares / posts.total)
//       const followers = personData?.data?.followers

//       return {
//         likes: avgLikes,
//         comments: avgComments,
//         shares: avgShares,
//         followers: followers,
//       }
//     } catch (e) {
//       throw new HttpException(e?.errorCode, e?.errorMessage)
//     }
//   }

//   async getPostPostStats(postURL: string): Promise<InstagramPostStats> {
//     try {
//       const data = await this.axiosService.get(
//         `https://instagram-statistics-api.p.rapidapi.com/posts/one`,
//         { postUrl: postURL },
//         {
//           'x-rapidapi-host': 'instagram-statistics-api.p.rapidapi.com',
//           'x-rapidapi-key': process.env.INSTAGRAM_API_KEY,
//         }
//       )

//       const _data = data.data
//       const { likes, comments, views } = _data

//       return {
//         likes,
//         comments,
//         views,
//       }
//     } catch (e) {
//       throw new HttpException(e?.errorCode, e?.errorMessage)
//     }
//   }
// }

// export { InstagramService }
