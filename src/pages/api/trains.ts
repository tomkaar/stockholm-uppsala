import { TrainAnnouncement } from '@/types/TrainAnnouncement'
import { handleFetchTrainAnnouncements } from '@/utils/handleFetchTrainAnnouncements'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = TrainAnnouncement[]

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const filteredAnnouncements = await handleFetchTrainAnnouncements({
    from: Array.isArray(req.query.from) ? req.query.from[0]: req.query.from,
    to: Array.isArray(req.query.to) ? req.query.to[0] : req.query.to,
    day: Array.isArray(req.query.day) ?  req.query.day[0] : req.query.day
  })

  res.status(200).json(filteredAnnouncements)
}

export default handler
