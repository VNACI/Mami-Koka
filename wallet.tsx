import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Plus, 
  Minus, 
  CreditCard, 
  TrendingUp, 
  Target,
  History,
  DollarSign,
  Smartphone
} from "lucide-react";
import { CURRENCY_FORMAT, MOBILE_MONEY_PROVIDERS } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";

export default function WalletPage() {
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [selectedProvider, setSelectedProvider] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();

  const { data: user, isLoading } = useQuery({
    queryKey: ['/api/users/1'],
  });

  const { data: notifications } = useQuery({
    queryKey: ['/api/users/1/notifications'],
  });

  const withdrawMutation = useMutation({
    mutationFn: async ({ amount, method }: { amount: number; method: string }) => {
      const response = await apiRequest('POST', '/api/users/1/wallet/withdraw', {
        amount,
        method,
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/users/1'] });
      queryClient.invalidateQueries({ queryKey: ['/api/users/1/notifications'] });
      toast({
        title: "Withdrawal Successful",
        description: "Your withdrawal has been processed successfully.",
      });
      setWithdrawAmount("");
      setSelectedProvider("");
    },
    onError: (error: any) => {
      toast({
        title: "Withdrawal Failed",
        description: error.message || "Failed to process withdrawal. Please try again.",
        variant: "destructive",
      });
    },
  });

  const depositMutation = useMutation({
    mutationFn: async ({ amount, method }: { amount: number; method: string }) => {
      const response = await apiRequest('POST', '/api/users/1/wallet/deposit', {
        amount,
        method,
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/users/1'] });
      queryClient.invalidateQueries({ queryKey: ['/api/users/1/notifications'] });
      toast({
        title: "Deposit Successful",
        description: "Your deposit has been added to your wallet.",
      });
      setDepositAmount("");
      setSelectedProvider("");
    },
    onError: (error: any) => {
      toast({
        title: "Deposit Failed",
        description: error.message || "Failed to process deposit. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(withdrawAmount);
    
    if (!amount || amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to withdraw.",
        variant: "destructive",
      });
      return;
    }

    if (!selectedProvider) {
      toast({
        title: "Select Provider",
        description: "Please select a mobile money provider.",
        variant: "destructive",
      });
      return;
    }

    const currentBalance = parseFloat(user?.walletBalance || "0");
    if (amount > currentBalance) {
      toast({
        title: "Insufficient Funds",
        description: "You don't have enough balance for this withdrawal.",
        variant: "destructive",
      });
      return;
    }

    withdrawMutation.mutate({ amount, method: selectedProvider });
  };

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(depositAmount);
    
    if (!amount || amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to deposit.",
        variant: "destructive",
      });
      return;
    }

    if (!selectedProvider) {
      toast({
        title: "Select Provider",
        description: "Please select a mobile money provider.",
        variant: "destructive",
      });
      return;
    }

    depositMutation.mutate({ amount, method: selectedProvider });
  };

  const quickAmounts = [5000, 10000, 25000, 50000, 100000];

  const paymentNotifications = notifications?.filter((n: any) => n.type === 'payment') || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Wallet</h1>
          <p className="text-muted-foreground">
            Manage your earnings and payments
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Wallet Balance Card */}
          <div className="lg:col-span-1">
            <Card className="wallet-gradient text-white mb-6">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Available Balance</h3>
                    <div className="text-3xl font-bold">
                      {CURRENCY_FORMAT(user?.walletBalance || "0")}
                    </div>
                  </div>
                  <Wallet className="h-12 w-12 opacity-50" />
                </div>
                
                <div className="grid grid-cols-2 gap-3 mt-6">
                  <Button 
                    variant="secondary" 
                    className="w-full"
                    onClick={() => setActiveTab("withdraw")}
                  >
                    <ArrowUpRight className="h-4 w-4 mr-2" />
                    Withdraw
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full text-white border-white hover:bg-white hover:text-primary"
                    onClick={() => setActiveTab("deposit")}
                  >
                    <ArrowDownLeft className="h-4 w-4 mr-2" />
                    Deposit
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Total Earned</span>
                  </div>
                  <span className="font-semibold">
                    {CURRENCY_FORMAT((parseFloat(user?.walletBalance || "0") * 1.5).toFixed(2))}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">This Month</span>
                  </div>
                  <span className="font-semibold">
                    {CURRENCY_FORMAT((parseFloat(user?.walletBalance || "0") * 0.3).toFixed(2))}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-purple-500" />
                    <span className="text-sm">Pending</span>
                  </div>
                  <span className="font-semibold">Le 0</span>
                </div>
              </CardContent>
            </Card>

            {/* Savings Goal */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Savings Goal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">New Laptop</span>
                    <span className="text-sm text-muted-foreground">62%</span>
                  </div>
                  <Progress value={62} className="h-2" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Le 775,000</span>
                    <span>Le 1,250,000</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add to Goal
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
                <TabsTrigger value="deposit">Deposit</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Recent Transactions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <History className="h-5 w-5" />
                      Recent Transactions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {paymentNotifications.length > 0 ? (
                        paymentNotifications.slice(0, 5).map((notification: any) => (
                          <div key={notification.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                                notification.message.includes('withdrawn') 
                                  ? 'bg-red-100 text-red-600' 
                                  : 'bg-green-100 text-green-600'
                              }`}>
                                {notification.message.includes('withdrawn') ? (
                                  <ArrowUpRight className="h-4 w-4" />
                                ) : (
                                  <ArrowDownLeft className="h-4 w-4" />
                                )}
                              </div>
                              <div>
                                <p className="font-medium text-sm">{notification.title}</p>
                                <p className="text-xs text-muted-foreground">{notification.message}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium">
                                {notification.message.includes('withdrawn') ? '-' : '+'}
                                Le {notification.message.match(/Le ([\d,]+)/)?.[1] || '0'}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(notification.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <History className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                          <p className="text-muted-foreground">No transactions yet</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Mobile Money Providers */}
                <Card>
                  <CardHeader>
                    <CardTitle>Supported Payment Methods</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {MOBILE_MONEY_PROVIDERS.map((provider) => (
                        <div key={provider.code} className="flex items-center gap-3 p-3 border rounded-lg">
                          <div className="text-2xl">{provider.icon}</div>
                          <div>
                            <p className="font-medium text-sm">{provider.name}</p>
                            <p className="text-xs text-muted-foreground">Available</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="withdraw" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Withdraw Money</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleWithdraw} className="space-y-4">
                      <div>
                        <Label htmlFor="withdrawAmount">Amount to Withdraw</Label>
                        <Input
                          id="withdrawAmount"
                          type="number"
                          placeholder="Enter amount"
                          value={withdrawAmount}
                          onChange={(e) => setWithdrawAmount(e.target.value)}
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="provider">Select Payment Method</Label>
                        <Select value={selectedProvider} onValueChange={setSelectedProvider}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Choose provider" />
                          </SelectTrigger>
                          <SelectContent>
                            {MOBILE_MONEY_PROVIDERS.map((provider) => (
                              <SelectItem key={provider.code} value={provider.name}>
                                <div className="flex items-center gap-2">
                                  <span>{provider.icon}</span>
                                  <span>{provider.name}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Quick Amounts</Label>
                        <div className="grid grid-cols-3 gap-2 mt-2">
                          {quickAmounts.map((amount) => (
                            <Button
                              key={amount}
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => setWithdrawAmount(amount.toString())}
                            >
                              {CURRENCY_FORMAT(amount)}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full"
                        disabled={withdrawMutation.isPending}
                      >
                        {withdrawMutation.isPending ? (
                          <>Processing...</>
                        ) : (
                          <>
                            <ArrowUpRight className="h-4 w-4 mr-2" />
                            Withdraw {withdrawAmount && CURRENCY_FORMAT(withdrawAmount)}
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="deposit" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Add Money</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleDeposit} className="space-y-4">
                      <div>
                        <Label htmlFor="depositAmount">Amount to Deposit</Label>
                        <Input
                          id="depositAmount"
                          type="number"
                          placeholder="Enter amount"
                          value={depositAmount}
                          onChange={(e) => setDepositAmount(e.target.value)}
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="provider">Select Payment Method</Label>
                        <Select value={selectedProvider} onValueChange={setSelectedProvider}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Choose provider" />
                          </SelectTrigger>
                          <SelectContent>
                            {MOBILE_MONEY_PROVIDERS.map((provider) => (
                              <SelectItem key={provider.code} value={provider.name}>
                                <div className="flex items-center gap-2">
                                  <span>{provider.icon}</span>
                                  <span>{provider.name}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Quick Amounts</Label>
                        <div className="grid grid-cols-3 gap-2 mt-2">
                          {quickAmounts.map((amount) => (
                            <Button
                              key={amount}
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => setDepositAmount(amount.toString())}
                            >
                              {CURRENCY_FORMAT(amount)}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full"
                        disabled={depositMutation.isPending}
                      >
                        {depositMutation.isPending ? (
                          <>Processing...</>
                        ) : (
                          <>
                            <ArrowDownLeft className="h-4 w-4 mr-2" />
                            Deposit {depositAmount && CURRENCY_FORMAT(depositAmount)}
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
