import { ObjectID } from 'mongodb'
import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
	const { db } = await connectToDatabase();
	
	switch (req.method) {		
		case 'DELETE':
			const response = await db
				.collection("tasks")
				.remove({ _id: ObjectID(req.query.id) });

			res.json(response);

			break;
	
		default: {
			const response = await db
				.collection("tasks")
				.find({ _id: ObjectID(req.query.id) })
				.toArray();

			res.json(response);

			break;
		}
	}
};
