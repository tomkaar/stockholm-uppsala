import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'
import { ChevronLeft } from '@/assets/icons/ChevronLeft'
import { ChevronRight } from '@/assets/icons/ChevronRight'
import { useFetchTrainAnnouncements } from '@/hooks/useFetchTrainAnnouncements'
import { TrainCard } from '@/components/TrainCard'
import { useState } from 'react'
import { useFetchMessages } from '@/hooks/useFetchMessages'
import { DisruptionMessage } from '@/components/DisruptionMessage'
import { Repeat } from '@/assets/icons/Repeat'

const stationStockholm = "Cst"
const stationUppsala = "U"

const Home = () => {
  const router = useRouter()
  const { query } = router

  const [displayPreviousTrains, set_displayPreviousTrains] = useState(false)
  
  const selectedDay = dayjs(Array.isArray(query.selectedDay) ? query.selectedDay[0] : query.selectedDay ?? new Date())
  const selectedDayIsToday = dayjs(selectedDay).isSame(new Date(), "day")
  const fromStation = Array.isArray(query.from) ? query.from[0] : query.from ?? stationUppsala
  const toStation = Array.isArray(query.to) ? query.to[0] : query.to ?? stationStockholm

  const previousDayQuery = { ...query, selectedDay : selectedDay.subtract(1, "day").format("YYYY-MM-DD") }
  const previousDayQueryString = '?' + new URLSearchParams(previousDayQuery).toString()
  const previousDayDisabled = dayjs(selectedDay).isBefore(dayjs().add(1, "day"), "day")
  
  const nextDayQuery = { ...query, selectedDay : selectedDay.add(1, "day").format("YYYY-MM-DD") }
  const nextDayQueryString = '?' + new URLSearchParams(nextDayQuery).toString()
  
  const todayQuery = { ...query, selectedDay : dayjs().format("YYYY-MM-DD") }
  const todayQueryString = '?' + new URLSearchParams(todayQuery).toString()
  
  const trainDirection = fromStation === stationUppsala ? "right" : "left"
  const flipStation = {...query, from: trainDirection === "right" ? stationStockholm : stationUppsala, to: trainDirection === "right" ? stationUppsala : stationStockholm }
  const flipStationString = '?' + new URLSearchParams(flipStation).toString()

  const { data, isLoading, error } = useFetchTrainAnnouncements({ from: fromStation, to: toStation, day: selectedDay.format("YYYY-MM-DD") })
  const { data: messageData } = useFetchMessages({ station: fromStation })

  const previousTrainAnnouncements = data
    ?.filter(announcement => announcement.TimeAtLocation)
    .sort((a, b) => new Date(a.AdvertisedTimeAtLocation ?? '').getTime() - new Date(b.AdvertisedTimeAtLocation ?? '').getTime())
  const upcomingTrainAnnouncements = data
    ?.filter(announcement => !announcement.TimeAtLocation)
    .sort((a, b) => new Date(a.AdvertisedTimeAtLocation ?? '').getTime() - new Date(b.AdvertisedTimeAtLocation ?? '').getTime())

  return (
    <>
      <Head>
        <title>Stockholm - Uppsala med Movingo</title>
        <meta name="description" content="Trains that run between Stockholm and Uppsala" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='bg-white dark:bg-slate-900'>
        <div className='sticky z-10 top-0 bg-white dark:bg-slate-900'>
          <div className='py-4 px-4 border-b border-slate-900/10 dark:border-slate-700'>
            <h1 className='text-slate-900 dark:text-white text-xl tracking-light text-center font-bold'>
              Stockholm &nbsp;
              <Link href={flipStationString}>
                <span className={`inline-block ${trainDirection === "left" ? "scale-x-[-1]" : ""}`}>🚂</span>
              </Link>
              &nbsp; Uppsala
            </h1>
          </div>

          <div className='py-2 px-4 border-b border-slate-900/10 dark:border-slate-700 flex justify-center text-black dark:text-white gap-4'>
            {previousDayDisabled ? (
              <div className='text-black/25 dark:text-white/25'>
                <ChevronLeft />
              </div>
            ) : (
            <Link href={previousDayQueryString}>
              <ChevronLeft />
            </Link>
            )}

            <Link href={todayQueryString} className='capitalize'>
              {selectedDay.format("dddd MMM DD")}
            </Link>

            <Link href={nextDayQueryString}>
              <ChevronRight />
            </Link>
          </div>
        </div>

        {selectedDayIsToday && !!messageData?.length && (
          <div className='bg-rose-500 dark:bg-rose-500'>
            {messageData.map(message => (
              <DisruptionMessage key={message.EventId} message={message} />
            ))}
          </div>
        )}

        <div className='flex flex-row justify-center'>
          <div className='flex flex-col gap-2 max-w-md w-full my-6 mx-4'>

            {!!previousTrainAnnouncements?.length && (
              <>
                <button className='mb-4 text-base text-slate-900/50 dark:text-slate-300/50' onClick={() => set_displayPreviousTrains(prev => !prev)}>
                  {displayPreviousTrains ? "Göm tidigare avgångar" : "Se tidigare avgångar"}
                </button>

                {displayPreviousTrains && previousTrainAnnouncements?.map(announcement => (
                  <TrainCard key={announcement.ActivityId} announcement={announcement} />
                ))}
              </>
            )}

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

      </main>
    </>
  )
}

export default Home
