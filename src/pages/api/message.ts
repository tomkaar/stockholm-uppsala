import { TrainAnnouncement } from '@/types/TrainAnnouncement'
import { handleFetchMessages } from '@/utils/handleFetchMessages'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = TrainAnnouncement[]

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const TrainMessage = await handleFetchMessages({ station: Array.isArray(req.query.station) ? req.query.station[0]: req.query.station })

  res.status(200).json(TrainMessage)
}

export default handler
