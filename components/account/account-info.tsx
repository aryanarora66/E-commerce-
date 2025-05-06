'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { User } from '@/types';
import { Edit, Mail, Phone, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AccountInfoProps {
  user: User;
}

export default function AccountInfo({ user }: AccountInfoProps) {
  const { toast } = useToast();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [formValues, setFormValues] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone || '',
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Profile updated",
        description: "Your changes have been saved successfully.",
      });
      setIsEditDialogOpen(false);
    }, 500);
  };
  
  const handleAvatarUpload = () => {
    setIsUploading(true);
    
    // Simulate upload
    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: "Avatar uploaded",
        description: "Your profile picture has been updated.",
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
        <div className="relative">
          <Avatar className="h-24 w-24">
            <AvatarImage src={user.image || undefined} alt={user.name || 'User'} />
            <AvatarFallback className="text-2xl">
              {user.name
                ? user.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()
                : 'U'}
            </AvatarFallback>
          </Avatar>
          <Button
            size="icon"
            variant="secondary"
            className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
            onClick={handleAvatarUpload}
            disabled={isUploading}
          >
            {isUploading ? (
              <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Upload className="h-4 w-4" />
            )}
          </Button>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">{user.name}</h2>
            {user.role === 'admin' && (
              <Badge variant="default">Admin</Badge>
            )}
            {user.role === 'seller' && (
              <Badge variant="secondary">Seller</Badge>
            )}
          </div>
          <div className="flex items-center text-muted-foreground">
            <Mail className="h-4 w-4 mr-2" />
            {user.email}
          </div>
          {user.phone && (
            <div className="flex items-center text-muted-foreground">
              <Phone className="h-4 w-4 mr-2" />
              {user.phone}
            </div>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditDialogOpen(true)}
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <h3 className="font-medium text-sm text-muted-foreground">Account Status</h3>
              <div className="flex justify-between">
                <div>Member since</div>
                <div className="font-medium">{new Date(user.createdAt).toLocaleDateString()}</div>
              </div>
              <div className="flex justify-between">
                <div>Last login</div>
                <div className="font-medium">{new Date(user.lastLogin).toLocaleDateString()}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <h3 className="font-medium text-sm text-muted-foreground">Activity Summary</h3>
              <div className="flex justify-between">
                <div>Orders completed</div>
                <div className="font-medium">{user.orderCount || 0}</div>
              </div>
              <div className="flex justify-between">
                <div>Reviews written</div>
                <div className="font-medium">{user.reviewCount || 0}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="name">
                Full Name
              </label>
              <Input
                id="name"
                name="name"
                value={formValues.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="email">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formValues.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="phone">
                Phone Number
              </label>
              <Input
                id="phone"
                name="phone"
                value={formValues.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}