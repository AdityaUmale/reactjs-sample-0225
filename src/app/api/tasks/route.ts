import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Task from '@/models/Task';
import TaskList from '@/models/TaskList';  // Add this import

export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const listId = searchParams.get('listId');

    if (!listId) {
      return NextResponse.json({ error: 'List ID is required' }, { status: 400 });
    }

    const tasks = await Task.find({ listId });
    return NextResponse.json(tasks);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error fetching tasks' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { title, details, date, listId } = await request.json();
    const task = await Task.create({
      title,
      details,
      date,
      listId
    });
    
    await TaskList.findByIdAndUpdate(
      listId,
      { $push: { tasks: task._id } }
    );
    
    return NextResponse.json(task);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error creating task' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await dbConnect();
    const { id, title, details, date, completed } = await request.json();
    const task = await Task.findByIdAndUpdate(
      id,
      { title, details, date, completed },
      { new: true }
    );
    return NextResponse.json(task);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error updating task' }, { status: 500 });
  }
}