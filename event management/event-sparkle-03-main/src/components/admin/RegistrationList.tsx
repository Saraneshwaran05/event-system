import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useEvents } from '@/contexts/EventContext';

export const RegistrationList = () => {
  const { registrations } = useEvents();

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>All Registrations</CardTitle>
        <CardDescription>View all user registrations across events</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border border-border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Event</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>College</TableHead>
                <TableHead>Registered At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {registrations.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    No registrations yet
                  </TableCell>
                </TableRow>
              ) : (
                registrations.map((registration) => (
                  <TableRow key={registration.id}>
                    <TableCell className="font-medium">{registration.fullName}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{registration.eventName}</Badge>
                    </TableCell>
                    <TableCell>{registration.email}</TableCell>
                    <TableCell>{registration.phone}</TableCell>
                    <TableCell>{registration.college}</TableCell>
                    <TableCell>
                      {new Date(registration.registeredAt).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
