import type { ActionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useFetcher } from '@remix-run/react'
import type { InputDefinition} from 'remix-validity-state';
import { useValidatedInput } from 'remix-validity-state'

type formSchema = {
	inputs: {
		schedule: InputDefinition
	}
}

const formDefinition = {
	inputs: {
		schedule: {
			validationAttrs: {
				type: 'checkbox',
			},
		},
	},
} satisfies formSchema

export const action = async ({ request }: ActionArgs) => {
	const body = new URLSearchParams(await request.text())
	const schedule = body.getAll('schedule')
	return json({ schedule })
}

const Index = () => {
	const fetcher = useFetcher()

	const { getInputAttrs, getLabelAttrs } = useValidatedInput<typeof formDefinition>({ formDefinition, name: 'schedule' })

	// Since we'll share these attributes across all checkboxes we call these
	// once here to avoid calling per-input.  And since we put the input inside
	// the label we don't need the `for` attribute
	const labelAttrs = getLabelAttrs({ htmlFor: undefined })
	const inputAttrs = getInputAttrs()

	const free = true

	const times = [
		{ time: 7, free },
		{ time: 8, free },
		{ time: 9, free },
		{ time: 10, free },
		{ time: 11, free },
		{ time: 12, free },
		{ time: 13, free },
		{ time: 14, free },
		{ time: 15, free },
		{ time: 16, free },
		{ time: 17, free },
		{ time: 18, free },
		{ time: 19, free },
		{ time: 20, free },
		{ time: 21, free },
		{ time: 22, free },
		{ time: 23, free },
	]

	const schedule = [
		{ id: '1', day: 'Monday', times },
		{ id: '2', day: 'Tuesday', times },
		{ id: '3', day: 'Wednesday', times },
		{ id: '4', day: 'Thursday', times },
		{ id: '5', day: 'Friday', times },
		{ id: '6', day: 'Saturday', times },
		{ id: '7', day: 'Sunday', times },
	]

	return (
		<fetcher.Form method="post" data-testid="schedule-form">
			<div>
				{schedule.map(({ id, day, times }) => (
					<fieldset key={day}>
						<legend>{day}</legend>
						<input {...inputAttrs} type="hidden" value={`id/${day}/${id}`} />
						{times.map(({ time, free }) => (
							<label key={`${day}-${time}`} {...labelAttrs} className="block">
								{`${time} - ${time + 1}`}
								<input
									{...{
										...inputAttrs,
										defaultChecked: free,
										value: `${day}-${time}`,
									}}
								/>
							</label>
						))}
					</fieldset>
				))}
			</div>
			<pre>{JSON.stringify(fetcher.data?.schedule, null, 2)}</pre>
			<button type="submit" disabled={fetcher.state !== 'idle'}>
				{fetcher.state !== 'idle' ? 'Guardando...' : 'Guardar'}
			</button>
		</fetcher.Form>
	)
}

export default Index
