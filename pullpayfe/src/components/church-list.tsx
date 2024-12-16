import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

interface Church {
  id: number
  name: string
  lastDonation: string
}

interface ChurchListProps {
  churches: Church[]
}

export function ChurchList({ churches }: ChurchListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Associated Churches</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Church Name</TableHead>
              <TableHead>Last Donation</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {churches.map((church) => (
              <TableRow key={church.id}>
                <TableCell>{church.name}</TableCell>
                <TableCell>{church.lastDonation}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

