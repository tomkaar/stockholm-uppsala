import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  status: string
}

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  res.status(200).json({ status: 'UP AND RUNNING' })
}

export default handler
