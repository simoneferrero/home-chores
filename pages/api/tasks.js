import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
	const { db } = await connectToDatabase();
	
	switch (req.method) {		
		case 'POST':
			const response = await db
				.collection("tasks")
				.insertOne(req.body);
			const [newTask] = response.ops

			res.json(newTask);

			break;
	
		default: {
			const tasks = await db
				.collection("tasks")
				.find({})
				.toArray();
						
			res.json(tasks);

			break;
		}
	}
};
