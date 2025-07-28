import { useConvexQuery } from "@convex-dev/react-query";
import { api } from "@2x4/backend/convex/_generated/api";
import { useCustomer } from "autumn-js/react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";

export const CustomerData = ({ user }: { user: ReturnType<typeof useConvexQuery<typeof api.auth.user.current>> }) => {
    const { customer, isLoading } = useCustomer();
    const [balance, setBalance] = useState(0);
    const [totalUsage, setTotalUsage] = useState(0);

    useEffect(() => {
        if(customer && !isLoading) {
            if (customer.features["random_number"]) {
                setBalance(customer.features["random_number"].balance ?? 0);
                setTotalUsage(customer.features["random_number"].included_usage ?? 0);
            }
        }
    }, [customer, isLoading]);

    if(!user || isLoading) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="text-center">
                    <p className="text-muted-foreground">Please sign in to view your customer data</p>
                </div>
            </div>
        );
    }

    if(isLoading) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="text-center">
                    <p className="text-muted-foreground">Loading customer data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>User Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-muted-foreground">Email:</span>
                            <span className="text-sm">{user.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-muted-foreground">First Name:</span>
                            <span className="text-sm">{user.firstName || 'Not provided'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-muted-foreground">Last Name:</span>
                            <span className="text-sm">{user.lastName || 'Not provided'}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Customer Data Card */}
            <Card>
                <CardHeader>
                    <CardTitle>Autumn Customer Data</CardTitle>
                </CardHeader>
                <CardContent>
                    {customer ? (
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-muted-foreground">Customer ID:</span>
                                    <span className="text-sm font-mono">{customer.id}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-muted-foreground">Name:</span>
                                    <span className="text-sm">{customer.name || 'Not provided'}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-muted-foreground">Email:</span>
                                    <span className="text-sm">{customer.email || 'Not provided'}</span>
                                </div>
                            </div>
                            
                            {/* Usage Progress */}
                            <div className="space-y-3">
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium text-muted-foreground">Usage Balance:</span>
                                        <span className="text-sm">{balance} / {totalUsage}</span>
                                    </div>
                                    <Progress value={totalUsage > 0 ? (balance / totalUsage) * 100 : 0} />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p className="text-muted-foreground text-sm">No customer data available</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}