import TableDetailed from "@/components/TableDetailed"
import {
    Table,
    TableBody,
    TableCaption,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export default function Detailed() {

    return (<div className="container h-screen p-10">
        <div className="grid grid-cols-4 mb-3 gap-3">
            {/* <CardsData transactions={transactions} /> */}
        </div>
        <Table className="bg-white rounded-xl">
            <TableCaption>A list of your recent trade</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Cours</TableHead>
                    <TableHead>Quantité</TableHead>
                    <TableHead>Date & Heure</TableHead>
                    <TableHead>Coût</TableHead>
                    <TableHead>Pertes et profits</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableDetailed />
            </TableBody>
        </Table>
    </div>)
}