import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'
import { useFetchTrainAnnouncements } from '@/hooks/useFetchTrainAnnouncements'
import { TrainCard } from '@/components/TrainCard'
import { useFetchMessages } from '@/hooks/useFetchMessages'
import { Repeat } from '@/assets/icons/Repeat'
import { Refresh } from '@/assets/icons/Refresh'
import { Navigation } from '@/components/Navigation'
import { DisruptionMessages } from '@/components/DisruptionMessages'
import { PreviousTrainsAnnouncements } from '@/components/PreviousTrainsAnnouncements'
import { stationUppsala, stationStockholm } from '@/constants/stations'

const Home = () => {
  const router = useRouter()
  const { query } = router

  const fromStation = Array.isArray(query.from) ? query.from[0] : query.from ?? stationUppsala
  const toStation = Array.isArray(query.to) ? query.to[0] : query.to ?? stationStockholm

  const selectedDay = dayjs(Array.isArray(query.selectedDay) ? query.selectedDay[0] : query.selectedDay ?? new Date())

  const trainDirection = fromStation === stationUppsala ? "right" : "left"
  const flipStation = {...query, from: trainDirection === "right" ? stationStockholm : stationUppsala, to: trainDirection === "right" ? stationUppsala : stationStockholm }
  const flipStationString = '?' + new URLSearchParams(flipStation).toString()

  const { data, refetch } = useFetchTrainAnnouncements({
    from: fromStation,
    to: toStation,
    day: selectedDay.format("YYYY-MM-DD"),
  })
  const { refetch: refetchMessages } = useFetchMessages({ station: fromStation })
  
  const upcomingTrainAnnouncements = data
    ?.filter(announcement => !announcement.TimeAtLocation)
    .sort((a, b) => new Date(a.AdvertisedTimeAtLocation ?? '').getTime() - new Date(b.AdvertisedTimeAtLocation ?? '').getTime())

  const handleRefresh = () => {
    refetch()
    refetchMessages()
  }

  return (
    <>
      <Head>
        <title>Stockholm - Uppsala med Movingo</title>
        <meta name="description" content="Trains that run between Stockholm and Uppsala" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='bg-white dark:bg-slate-900'>
        <Navigation announcements={data ?? []} />

        <DisruptionMessages />

        <div className='flex flex-row justify-center'>
          <div className='flex flex-col gap-2 max-w-md w-full my-6 mx-4'>

            <PreviousTrainsAnnouncements announcements={data ?? []} />

            {upcomingTrainAnnouncements?.map(announcement => (
              <TrainCard key={announcement.ActivityId} announcement={announcement} />
            ))}
          </div>
        </div>

        <Link 
          href={flipStationString}
          className='fixed bottom-4 right-4 bg-emerald-500 dark:bg-emerald-700 p-4 rounded-full text-white'
        >
          <Repeat />
        </Link>

        <button 
          onClick={handleRefresh}
          className='fixed bottom-4 left-4 bg-emerald-500 dark:bg-emerald-700 p-4 rounded-full text-white'
        >
          <Refresh />
        </button>

      </main>
    </>
  )
}

// export async function getServerSideProps(context: any) {
//   const { query } = context as any

//   const selectedDay = dayjs(Array.isArray(query.selectedDay) ? query.selectedDay[0] : query.selectedDay ?? new Date())
//   const fromStation = Array.isArray(query.from) ? query.from[0] : query.from ?? stationUppsala
//   const toStation = Array.isArray(query.to) ? query.to[0] : query.to ?? stationStockholm

//   const [initialTrainAnnouncements, initialMessages] = await Promise.all([
//     handleFetchTrainAnnouncements({
//       day: selectedDay.format("YYYY-MM-DD"),
//       from: fromStation,
//       to: toStation,
//     }),
//     handleFetchMessages({
//       station: fromStation,
//     })
//   ])

//   return {
//     props: {
//       initialTrainAnnouncements,
//       initialMessages,
//     },
//   }
// }

export default Home
