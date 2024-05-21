'use client'

import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command'
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
				className='absolute w-12 h-12 top-8 right-16 bg-neutral-900 dark:bg-white rounded-full text-white dark:text-black animate-in duration-200 font-semibold'
			>
				{darkMode ? 'LGT' : 'DRK'}
			</button>
			<div className='grid grid-rows-[1fr_auto] h-screen w-screen bg-neutral-200 dark:bg-neutral-900'>
				<div className='flex flex-col gap-6 dark:bg-neutral-900 items-center pt-32 duration-500 animate-in animate fade-in-5 slide-in-from-bottom-2.5'>
					<h1
						className='text-5xl tracking-tight font-bold animate-text-gradient bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-700 hover:bg-gradient-to-l hover:from-yellow-700 hover:to-yellow-200
    bg-[200%_auto] bg-clip-text text-transparent'
					>
						SpeedSearch⚡
					</h1>
					<p className='text-zinc-600 text-lg max-w-prose text-center dark:text-white'>
						A high-performance API built with Hono, Next.js and Cloudflare.
						<br />
						Type a query below and get your results in miliseconds.
					</p>

					<div className='max-w-md w-full'>
						<Command className='shadow-lg'>
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

					{/* <footer className='mt-auto mb-8'>
						<Link href='https://tailwindcss.com/docs/box-shadowhttps://github.com/GoGagoo/fastapi_counrties'>GAGO</Link>
					</footer> */}
				</div>
			</div>
		</main>
	)
}
