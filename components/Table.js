import { useEffect } from 'react'
import PropTypes from 'prop-types'

const weeks = 5
const taskTypes = [
	{
	  "type": "vacuum-hardwood-floors",
	  "display": "Vacuum Hardwood Floors"
	},
	{
	  "type": "vacuum-carpet-floors",
	  "display": "Vacuum Carpet Floors"
	},
	{
	  "type": "vacuum-toilet-floors",
	  "display": "Vacuum Toilet Floors"
	},
	{
	  "type": "clean-hardwood-floors",
	  "display": "Clean Hardwood Floors"
	},
	{
	  "type": "clean-toilet-floors",
	  "display": "Clean Toilet Floors"
	},
	{
	  "type": "vacuum-sofas",
	  "display": "Vacuum Sofas"
	},
	{
	  "type": "disinfect-kitchen",
	  "display": "Disinfect Kitchen"
	},
	{
	  "type": "clean-bathroom-sink-1",
	  "display": "Clean Main Bathroom Sink"
	},
	{
	  "type": "clean-bathroom-toilet-1",
	  "display": "Clean Main Bathroom Toilet"
	},
	{
	  "type": "clean-bathroom-sink-2",
	  "display": "Clean Small Bathroom Sink"
	},
	{
	  "type": "clean-bathroom-toilet-2",
	  "display": "Clean Small Bathroom Toliet"
	},
	{
	  "type": "clean-bathtub",
	  "display": "Clean Bathtub"
	},
	{
	  "type": "clean-shower",
	  "display": "Clean Shower"
	},
	{
	  "type": "dust-off",
	  "display": "Dust Off"
	},
	{
	  "type": "clean-table",
	  "display": "Clean Table"
	},
	{
	  "type": "change-bed-sheets",
	  "display": "Change Bed Sheets"
	},
	{
	  "type": "change-litter",
	  "display": "Change Litter"
	}
  ]

const Table = ({ completedTasks, handleCompleteTask, handleResetTask }) => {
	const formattedCompletedTasks = completedTasks.reduce((allTasks, { week, type, _id }) => ({
		...allTasks,
		[week]: {
			...allTasks[week],
			[type]: _id,
		}
	}), {})

	return <div className="rounded-t-xl bg-gradient-to-r from-light-blue-50 to-light-blue-100 p-10">
		<table className="table-fixed">
			<tbody>
				{Array.from(Array(weeks).keys()).map((index) => {
					const week = index + 1
					return (
						<tr key={`week-${week}`}>
							<td className="border border-light-blue-500 px-4 py-2 text-gray-500 font-medium">Week {week}</td>
							{taskTypes.map((({ type, display }) => {
								const isCompleted = !!formattedCompletedTasks?.[week]?.[type]
								return (
									<td className={`border border-light-blue-500 px-4 py-2 font-medium text-gray-${isCompleted ? '500' : '200'}`} key={type}>
										<button onClick={() => isCompleted ? handleResetTask(formattedCompletedTasks[week][type]) : handleCompleteTask(week, type)}>{display}</button>
									</td>
								)
							}))}
						</tr>
					)
				})}
			</tbody>
		</table>
	</div>
}

Table.propTypes = {
	completedTasks: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string.isRequired,
			week: PropTypes.number.isRequired,
			type: PropTypes.string.isRequired,
		})
	),
	handleCompleteTask: PropTypes.func.isRequired,
	handleResetTask: PropTypes.func.isRequired,
}

export default Table
