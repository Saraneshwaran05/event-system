import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useEvents } from '@/contexts/EventContext';

export const PaymentList = () => {
  const { registrations, events } = useEvents();

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Payment Details</CardTitle>
        <CardDescription>Track payment status for all registrations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border border-border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Event</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {registrations.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    No payment records yet
                  </TableCell>
                </TableRow>
              ) : (
                registrations.map((registration) => {
                  const event = events.find(e => e.id === registration.eventId);
                  return (
                    <TableRow key={registration.id}>
                      <TableCell className="font-medium">{registration.fullName}</TableCell>
                      <TableCell>{registration.eventName}</TableCell>
                      <TableCell className="font-semibold">₹{event?.fees || 0}</TableCell>
                      <TableCell>{registration.paymentOption}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={registration.paymentStatus === 'Pending' ? 'secondary' : 'default'}
                          className={registration.paymentStatus === 'Pending' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}
                        >
                          {registration.paymentStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(registration.registeredAt).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
