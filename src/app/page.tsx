'use client'

import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home() {
	const [input, setInput] = useState<string>('')
	const [searchResults, setSearchResults] = useState<{
		results: string[]
		duration: number
	}>()
	const [darkMode, setDarkMode] = useState(false)

	const toggleDarkMode = () => {
		setDarkMode(!darkMode)
	}

	useEffect(() => {
		const fetchData = async () => {
			if (!input) return setSearchResults(undefined)

			const res = await fetch(
				`https://fastapi.gagika57.workers.dev/api/search?q=${input}`
			)
			const data = (await res.json()) as { results: string[]; duration: number }
			setSearchResults(data)
		}

		fetchData()
	}, [input])

	return (
		<main className={`flex flex-col min-h-screen ${darkMode && 'dark'}`}>
			<button
				onClick={toggleDarkMode}
				className='absolute outline-none w-10 h-10 sm:w-14 sm:h-14 top-8 right-2 sm:right-16 bg-neutral-900 hover:bg-neutral-300 dark:hover:bg-neutral-300 dark:bg-white rounded-full text-white dark:text-black animate-in duration-200 font-semibold'
			>
				{darkMode ? 'LGT' : 'DRK'}
			</button>
			<div className='grid grid-rows-[1fr_auto] h-screen w-screen bg-neutral-200 dark:bg-neutral-900'>
				<div className='flex flex-col gap-6 dark:bg-neutral-900 items-center pt-28 duration-500 animate-in animate fade-in-5 slide-in-from-bottom-2.5'>
					<h1 className='text-5xl tracking-tight font-bold animate-text-gradient bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-700 hover:bg-gradient-to-l hover:from-yellow-700 hover:to-yellow-200 bg-[200%_auto] bg-clip-text text-transparent'>
						SpeedSearch⚡
					</h1>
					<p className='text-zinc-600 text-sm sm:text-[16px] max-w-prose text-center dark:text-white'>
						A high-performance API built with Hono, Next.js and Cloudflare.
						<br />
						Type a query below and get your results in milliseconds.
					</p>

					<div className='max-w-md w-80 sm:w-full'>
						<Command className='shadow-lg outline-none'>
							<CommandInput
								value={input}
								onValueChange={setInput}
								placeholder='Search countries...'
								className='placeholder:text-zinc-500'
							/>
							<CommandList>
								{searchResults?.results.length === 0 ? (
									<CommandEmpty>No results found 👽</CommandEmpty>
								) : null}

								{searchResults?.results ? (
									<CommandGroup heading='Results'>
										{searchResults?.results.map((result) => (
											<CommandItem
												key={result}
												value={result}
												onSelect={setInput}
											>
												{result}
											</CommandItem>
										))}
									</CommandGroup>
								) : null}

								{searchResults?.results ? (
									<>
										<div className='h-px w-full bg-zinc-200' />

										<p className='p-2 text-xs text-zinc-500'>
											Found {searchResults.results.length} results in{' '}
											{searchResults?.duration.toFixed(0)}ms
										</p>
									</>
								) : null}
							</CommandList>
						</Command>
					</div>

					<footer className='mb	-auto'>
						<Link
							target='_blank'
							className='dark:text-white font-semibold'
							href='https://gogagoo-cv.vercel.app/'
						>
							<button className='cursor-pointer rounded-md bg-neutral-950 dark:bg-white px-3 py-1 text-sm text-white dark:text-black dark:hover:bg-neutral-300 shadow-lg shadow-neutral-500/20 outline-none hover:bg-neutral-800 active:bg-neutral-700 transition active:scale-[.95]'>
								GoGagoo 2024
							</button>
						</Link>
					</footer>
				</div>
			</div>
		</main>
	)
}
