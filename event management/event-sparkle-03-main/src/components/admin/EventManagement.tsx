import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useEvents, Event } from '@/contexts/EventContext';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { toast } from 'sonner';

export const EventManagement = () => {
  const { events, addEvent, updateEvent, deleteEvent } = useEvents();
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    date: '',
    time: '',
    fees: ''
  });

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      location: '',
      date: '',
      time: '',
      fees: ''
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const eventData = {
      ...formData,
      fees: parseFloat(formData.fees)
    };

    if (editingId) {
      updateEvent(editingId, eventData);
      toast.success('Event updated successfully');
    } else {
      addEvent(eventData);
      toast.success('Event added successfully');
    }
    
    resetForm();
  };

  const handleEdit = (event: Event) => {
    setFormData({
      name: event.name,
      description: event.description,
      location: event.location,
      date: event.date,
      time: event.time,
      fees: event.fees.toString()
    });
    setEditingId(event.id);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      deleteEvent(id);
      toast.success('Event deleted successfully');
    }
  };

  return (
    <div className="space-y-6">
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            {isEditing ? 'Edit Event' : 'Add New Event'}
          </CardTitle>
          <CardDescription>
            {isEditing ? 'Update event details' : 'Create a new event for registration'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Event Name *</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Tech Innovation Summit"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Grand Convention Center"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Time *</Label>
                <Input
                  id="time"
                  type="time"
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fees">Registration Fees (₹) *</Label>
                <Input
                  id="fees"
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={formData.fees}
                  onChange={(e) => setFormData({ ...formData, fees: e.target.value })}
                  placeholder="500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your event..."
                rows={3}
              />
            </div>

            <div className="flex gap-3">
              {isEditing && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              )}
              <Button type="submit" className="bg-gradient-to-r from-primary to-accent">
                {isEditing ? 'Update Event' : 'Add Event'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle>All Events</CardTitle>
          <CardDescription>Manage your event listings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Fees</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground">
                      No events added yet
                    </TableCell>
                  </TableRow>
                ) : (
                  events.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-medium">{event.name}</TableCell>
                      <TableCell>{event.location}</TableCell>
                      <TableCell>
                        {new Date(event.date).toLocaleDateString()} at {event.time}
                      </TableCell>
                      <TableCell>₹{event.fees}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(event)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(event.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
