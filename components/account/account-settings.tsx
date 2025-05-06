'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { User } from '@/types';
import { AlertTriangle, Eye, EyeOff } from 'lucide-react';

interface AccountSettingsProps {
  user: User;
}

export default function AccountSettings({ user }: AccountSettingsProps) {
  const { toast } = useToast();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  // Notification settings
  const [notifications, setNotifications] = useState({
    marketing: true,
    orderUpdates: true,
    accountActivity: true,
    productUpdates: false,
    newsletter: true,
  });
  
  // Privacy settings
  const [privacy, setPrivacy] = useState({
    dataSharing: false,
    activityTracking: true,
    savePaymentInfo: true,
  });
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords don't match",
        description: "New password and confirm password must match.",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      
      toast({
        title: "Password updated",
        description: "Your password has been changed successfully.",
      });
    }, 1000);
  };
  
  const handleNotificationChange = (key: keyof typeof notifications, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
    
    toast({
      title: "Preferences updated",
      description: "Your notification preferences have been saved.",
    });
  };
  
  const handlePrivacyChange = (key: keyof typeof privacy, value: boolean) => {
    setPrivacy(prev => ({ ...prev, [key]: value }));
    
    toast({
      title: "Privacy settings updated",
      description: "Your privacy settings have been saved.",
    });
  };
  
  const handleDeleteAccount = () => {
    // In a real app, this would show a confirmation dialog first
    toast({
      variant: "destructive",
      title: "Account deletion requested",
      description: "We've sent an email with instructions to complete this process.",
    });
  };

  return (
    <Tabs defaultValue="general" className="w-full">
      <TabsList className="grid grid-cols-3 mb-8">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="privacy">Privacy & Security</TabsTrigger>
      </TabsList>
      
      <TabsContent value="general">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Update your personal information and email preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue={user.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={user.email} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue={user.phone || ''} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>
                Update your password to enhance account security.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      name="currentPassword"
                      type={showCurrentPassword ? "text" : "password"}
                      value={passwordForm.currentPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                      {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      value={passwordForm.newPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={passwordForm.confirmPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full md:w-auto"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <span className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></span>
                      Updating...
                    </span>
                  ) : (
                    'Update Password'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      
      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>
              Manage how and when you receive notifications.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Marketing emails</Label>
                <p className="text-sm text-muted-foreground">
                  Receive emails about new products, features, and offers.
                </p>
              </div>
              <Switch
                checked={notifications.marketing}
                onCheckedChange={(value) => handleNotificationChange('marketing', value)}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Order updates</Label>
                <p className="text-sm text-muted-foreground">
                  Notifications about your order status and tracking.
                </p>
              </div>
              <Switch
                checked={notifications.orderUpdates}
                onCheckedChange={(value) => handleNotificationChange('orderUpdates', value)}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Account activity</Label>
                <p className="text-sm text-muted-foreground">
                  Security alerts and account-related notifications.
                </p>
              </div>
              <Switch
                checked={notifications.accountActivity}
                onCheckedChange={(value) => handleNotificationChange('accountActivity', value)}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Product updates</Label>
                <p className="text-sm text-muted-foreground">
                  Updates about products you've purchased or reviewed.
                </p>
              </div>
              <Switch
                checked={notifications.productUpdates}
                onCheckedChange={(value) => handleNotificationChange('productUpdates', value)}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Newsletter</Label>
                <p className="text-sm text-muted-foreground">
                  Weekly digest of new arrivals and trending products.
                </p>
              </div>
              <Switch
                checked={notifications.newsletter}
                onCheckedChange={(value) => handleNotificationChange('newsletter', value)}
              />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="privacy">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>
                Manage how your data is used and shared.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Data sharing with partners</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow us to share your information with trusted partners.
                  </p>
                </div>
                <Switch
                  checked={privacy.dataSharing}
                  onCheckedChange={(value) => handlePrivacyChange('dataSharing', value)}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Activity tracking</Label>
                  <p className="text-sm text-muted-foreground">
                    Track your browsing to improve product recommendations.
                  </p>
                </div>
                <Switch
                  checked={privacy.activityTracking}
                  onCheckedChange={(value) => handlePrivacyChange('activityTracking', value)}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Save payment information</Label>
                  <p className="text-sm text-muted-foreground">
                    Securely store your payment methods for faster checkout.
                  </p>
                </div>
                <Switch
                  checked={privacy.savePaymentInfo}
                  onCheckedChange={(value) => handlePrivacyChange('savePaymentInfo', value)}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Delete Account</CardTitle>
              <CardDescription>
                Permanently remove your account and all associated data.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-destructive/10 p-4 rounded-md flex gap-3 mb-4">
                <AlertTriangle className="h-5 w-5 text-destructive shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-destructive">Warning</p>
                  <p className="mt-1">
                    Deleting your account is permanent and cannot be undone. All your data, including orders, reviews, and personal information will be permanently removed.
                  </p>
                </div>
              </div>
              <Button
                variant="destructive"
                onClick={handleDeleteAccount}
              >
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
}