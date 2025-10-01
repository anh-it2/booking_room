
type StudentInforProp = {
    pageSize: number,
    pageIndex: number,
    team: string,
    status: string
}

export async function getStudentInfor(payload:StudentInforProp) {
    const res = await fetch('/api/student', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        });

        const data = await res.json();
        return data
}