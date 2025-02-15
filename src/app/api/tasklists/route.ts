import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import TaskList from '@/models/TaskList';
import '@/models/Task'; 

export async function GET() {
  try {
    await dbConnect();
    const taskLists = await TaskList.find().populate('tasks');
    return NextResponse.json(taskLists);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error fetching task lists' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { title } = await request.json();
    const taskList = await TaskList.create({ title });
    return NextResponse.json(taskList);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error creating task list' }, { status: 500 });
  }
}