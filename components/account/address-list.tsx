'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Edit, Trash2, Home, Plus } from 'lucide-react';
import { getAddresses } from '@/lib/services/user-service';

export default function AddressList() {
  const { toast } = useToast();
  const [addresses, setAddresses] = useState(getAddresses());
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentAddress, setCurrentAddress] = useState<any>(null);
  const [formValues, setFormValues] = useState({
    fullName: '',
    phoneNumber: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    isDefault: false,
  });
  
  const handleOpenAddDialog = () => {
    setFormValues({
      fullName: '',
      phoneNumber: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'US',
      isDefault: false,
    });
    setIsAddDialogOpen(true);
  };
  
  const handleOpenEditDialog = (address: any) => {
    setCurrentAddress(address);
    setFormValues({
      fullName: address.fullName,
      phoneNumber: address.phoneNumber,
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2 || '',
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
      country: address.country,
      isDefault: address.isDefault,
    });
    setIsEditDialogOpen(true);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (checked: boolean) => {
    setFormValues((prev) => ({ ...prev, isDefault: checked }));
  };
  
  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real application, this would call an API to save the address
    const newAddress = {
      id: `addr_${Math.random().toString(36).substr(2, 9)}`,
      ...formValues,
    };
    
    let updatedAddresses = [...addresses, newAddress];
    
    // If setting as default, update other addresses
    if (formValues.isDefault) {
      updatedAddresses = updatedAddresses.map(addr => ({
        ...addr,
        isDefault: addr.id === newAddress.id,
      }));
    }
    
    setAddresses(updatedAddresses);
    setIsAddDialogOpen(false);
    
    toast({
      title: "Address added",
      description: "Your address has been saved successfully.",
    });
  };
  
  const handleEditAddress = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentAddress) return;
    
    // Update the address
    let updatedAddresses = addresses.map(addr => 
      addr.id === currentAddress.id ? { ...addr, ...formValues } : addr
    );
    
    // If setting as default, update other addresses
    if (formValues.isDefault) {
      updatedAddresses = updatedAddresses.map(addr => ({
        ...addr,
        isDefault: addr.id === currentAddress.id,
      }));
    }
    
    setAddresses(updatedAddresses);
    setIsEditDialogOpen(false);
    
    toast({
      title: "Address updated",
      description: "Your address has been updated successfully.",
    });
  };
  
  const handleDeleteAddress = (addressId: string) => {
    // In a real application, this would call an API to delete the address
    const updatedAddresses = addresses.filter(addr => addr.id !== addressId);
    setAddresses(updatedAddresses);
    
    toast({
      title: "Address deleted",
      description: "Your address has been removed successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Your Addresses</h3>
        <Button onClick={handleOpenAddDialog}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Address
        </Button>
      </div>
      
      {addresses.length === 0 ? (
        <div className="text-center py-10 border rounded-lg">
          <Home className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium mb-2">No addresses yet</h3>
          <p className="text-muted-foreground mb-4">
            Add a shipping address to speed up your checkout process.
          </p>
          <Button onClick={handleOpenAddDialog}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Address
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <Card key={address.id}>
              <CardContent className="p-6">
                {address.isDefault && (
                  <div className="mb-2">
                    <Badge variant="outline" className="bg-primary/10 hover:bg-primary/10 text-primary border-primary/20">
                      Default
                    </Badge>
                  </div>
                )}
                <div className="space-y-1">
                  <p className="font-medium">{address.fullName}</p>
                  <p>{address.addressLine1}</p>
                  {address.addressLine2 && <p>{address.addressLine2}</p>}
                  <p>
                    {address.city}, {address.state} {address.postalCode}
                  </p>
                  <p>{address.country}</p>
                  <p className="text-muted-foreground">{address.phoneNumber}</p>
                </div>
              </CardContent>
              <CardFooter className="px-6 py-4 flex justify-between border-t">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleOpenEditDialog(address)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-destructive hover:text-destructive"
                  onClick={() => handleDeleteAddress(address.id)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      
      {/* Add Address Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Address</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddAddress} className="space-y-4">
            <AddressForm 
              formValues={formValues} 
              handleInputChange={handleInputChange} 
              handleCheckboxChange={handleCheckboxChange} 
            />
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Add Address</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Edit Address Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Address</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditAddress} className="space-y-4">
            <AddressForm 
              formValues={formValues} 
              handleInputChange={handleInputChange} 
              handleCheckboxChange={handleCheckboxChange} 
            />
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

// A reusable component for both add and edit forms
function AddressForm({ 
  formValues, 
  handleInputChange, 
  handleCheckboxChange 
}: { 
  formValues: any, 
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  handleCheckboxChange: (checked: boolean) => void
}) {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            name="fullName"
            value={formValues.fullName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            value={formValues.phoneNumber}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      
      <div className="space-y-1.5">
        <Label htmlFor="addressLine1">Address Line 1</Label>
        <Input
          id="addressLine1"
          name="addressLine1"
          value={formValues.addressLine1}
          onChange={handleInputChange}
          required
        />
      </div>
      
      <div className="space-y-1.5">
        <Label htmlFor="addressLine2">Address Line 2 (Optional)</Label>
        <Input
          id="addressLine2"
          name="addressLine2"
          value={formValues.addressLine2}
          onChange={handleInputChange}
        />
      </div>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            name="city"
            value={formValues.city}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="state">State/Province</Label>
          <Input
            id="state"
            name="state"
            value={formValues.state}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="postalCode">Postal Code</Label>
          <Input
            id="postalCode"
            name="postalCode"
            value={formValues.postalCode}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            name="country"
            value={formValues.country}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-2 pt-2">
        <Checkbox
          id="isDefault"
          checked={formValues.isDefault}
          onCheckedChange={handleCheckboxChange}
        />
        <Label htmlFor="isDefault" className="font-normal">
          Set as default address
        </Label>
      </div>
    </>
  );
}

// Helper component for badges
function Badge({ children, variant, className }: any) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${className}`}>
      {children}
    </span>
  );
}