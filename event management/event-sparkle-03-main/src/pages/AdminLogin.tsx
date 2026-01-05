import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock } from 'lucide-react';
import { toast } from 'sonner';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      localStorage.setItem('isAdminLoggedIn', 'true');
      toast.success('Login successful!');
      navigate('/admin/dashboard');
    } else {
      toast.error('Invalid credentials. Try username: admin, password: admin123');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-secondary p-4">
      <Card className="w-full max-w-md animate-scale-in shadow-[var(--shadow-soft)]">
        <CardHeader className="space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
            <Lock className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access the admin dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                placeholder="admin"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                placeholder="admin123"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-primary to-accent">
              Sign In
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Default credentials: username: <span className="font-mono">admin</span>, password: <span className="font-mono">admin123</span>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
