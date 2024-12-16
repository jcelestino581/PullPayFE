import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface DonorInfoProps {
    first_name: string
    last_name: string
    email: string
}

export function DonorInfo({ first_name, last_name, email }: DonorInfoProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Donor Information</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-2">
                    <div>
                        <span className="font-semibold">Name:</span> {first_name} {last_name}
                    </div>
                    <div>
                        <span className="font-semibold">Email:</span> {email}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

