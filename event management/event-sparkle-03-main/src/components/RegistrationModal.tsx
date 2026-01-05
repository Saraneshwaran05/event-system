import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Event, useEvents } from '@/contexts/EventContext';
import { IndianRupee, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const RAZORPAY_KEY_ID = 'rzp_test_RNh0qZpmrPFLcI';

interface RegistrationModalProps {
  event: Event | null;
  open: boolean;
  onClose: () => void;
}

export const RegistrationModal = ({ event, open, onClose }: RegistrationModalProps) => {
  const { addRegistration } = useEvents();
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    college: '',
    paymentOption: ''
  });

  const handlePayment = () => {
    if (!event) return;

    const options = {
      key: RAZORPAY_KEY_ID,
      amount: event.fees * 100, // Amount in paise
      currency: 'INR',
      name: event.name,
      description: `Registration for ${event.name}`,
      handler: function (response: any) {
        addRegistration({
          eventId: event.id,
          eventName: event.name,
          ...formData
        });
        
        setShowSuccess(true);
        toast.success('Payment successful! Registration completed.');
        
        setTimeout(() => {
          setShowSuccess(false);
          setFormData({
            fullName: '',
            email: '',
            phone: '',
            college: '',
            paymentOption: ''
          });
          onClose();
        }, 2500);
      },
      prefill: {
        name: formData.fullName,
        email: formData.email,
        contact: formData.phone,
      },
      theme: {
        color: '#9b87f5',
      },
      modal: {
        ondismiss: function() {
          toast.error('Payment cancelled');
        }
      }
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!event) return;
    handlePayment();
  };

  if (!event) return null;

  if (showSuccess) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center justify-center py-8 space-y-4 animate-scale-in">
            <div className="rounded-full bg-success/10 p-4">
              <CheckCircle2 className="h-16 w-16 text-success" />
            </div>
            <DialogTitle className="text-2xl font-bold text-center">Registration Successful!</DialogTitle>
            <DialogDescription className="text-center">
              You have successfully registered for <span className="font-semibold text-foreground">{event.name}</span>.
              <br />
              Check your email for confirmation details.
            </DialogDescription>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Register for {event.name}</DialogTitle>
          <DialogDescription>Fill in your details to complete the registration</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Enter your full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your.email@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 XXXXX XXXXX"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="college">College/Department *</Label>
              <Input
                id="college"
                required
                value={formData.college}
                onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                placeholder="Your college or department"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="payment">Payment Option *</Label>
              <Select
                required
                value={formData.paymentOption}
                onValueChange={(value) => setFormData({ ...formData, paymentOption: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UPI">UPI</SelectItem>
                  <SelectItem value="Credit Card">Credit Card</SelectItem>
                  <SelectItem value="Debit Card">Debit Card</SelectItem>
                  <SelectItem value="Net Banking">Net Banking</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-lg bg-secondary p-4 space-y-3">
            <h4 className="font-semibold text-foreground">Payment Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Event:</span>
                <span className="font-medium text-foreground">{event.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Registration Fees:</span>
                <span className="font-medium text-foreground flex items-center gap-1">
                  <IndianRupee className="h-4 w-4" />
                  {event.fees}
                </span>
              </div>
              {formData.paymentOption && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Method:</span>
                  <span className="font-medium text-foreground">{formData.paymentOption}</span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-border">
                <span className="text-muted-foreground">Payment Status:</span>
                <span className="font-medium text-amber-600">Pending</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-gradient-to-r from-primary to-accent">
              Proceed to Pay
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
