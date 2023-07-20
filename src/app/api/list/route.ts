import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    try {
        const res = await fetch(`https://leetcode.com/list/api/get_list/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const data = await res.json()

        if (!data.name || !data.creator || !data.questions) {
            return NextResponse.json({ message: "List not found.", success: false });
        }

        console.log(data)
        return NextResponse.json({ data, success: true })

    } catch (err) {
        return NextResponse.json({ message: "Error occurred", success: false })
    }
}
