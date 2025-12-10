import { useState } from "react";
import { 
  ArrowLeft, 
  Plus, 
  CreditCard, 
  Smartphone,
  ChevronRight,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { WalletItem } from "@/components/ui/NotificationItem";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { mockWalletTransactions } from "@/lib/mockData";

interface WalletScreenProps {
  onBack?: () => void;
}

export function WalletScreen({ onBack }: WalletScreenProps) {
  const [balance] = useState(1325);
  const [showTopUpSheet, setShowTopUpSheet] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [showSuccessSheet, setShowSuccessSheet] = useState(false);

  const quickAmounts = [100, 300, 500, 1000];

  const handleTopUp = () => {
    setShowTopUpSheet(false);
    setShowSuccessSheet(true);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="gradient-primary px-6 pt-12 pb-8 rounded-b-3xl">
        {onBack && (
          <Button variant="glass" size="iconSm" onClick={onBack} className="mb-4">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        
        <p className="text-primary-foreground/80 text-sm">Available Balance</p>
        <h1 className="text-4xl font-bold text-primary-foreground mb-6">
          ฿{balance.toLocaleString()}
        </h1>

        <Button 
          variant="glass" 
          size="lg" 
          className="w-full"
          onClick={() => setShowTopUpSheet(true)}
        >
          <Plus className="h-5 w-5 mr-2" />
          Top Up
        </Button>
      </div>

      <div className="px-6 py-6">
        {/* Payment methods */}
        <h2 className="text-lg font-bold mb-4">Payment Methods</h2>
        <div className="space-y-3 mb-8">
          <Card variant="default" className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
              <CreditCard className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-medium">•••• 4242</p>
              <p className="text-sm text-muted-foreground">Visa</p>
            </div>
            <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">Default</span>
          </Card>
          
          <Button variant="outline" className="w-full">
            <Plus className="h-5 w-5 mr-2" />
            Add Payment Method
          </Button>
        </div>

        {/* Transaction history */}
        <h2 className="text-lg font-bold mb-4">Transaction History</h2>
        <Card variant="flat" className="divide-y divide-border overflow-hidden">
          {mockWalletTransactions.map((tx) => (
            <WalletItem
              key={tx.id}
              type={tx.type}
              amount={tx.amount}
              description={tx.description}
              timestamp={tx.timestamp}
              status={tx.status}
            />
          ))}
        </Card>
      </div>

      {/* Top up sheet */}
      <BottomSheet
        isOpen={showTopUpSheet}
        onClose={() => setShowTopUpSheet(false)}
        title="Top Up"
      >
        <div className="p-6">
          <p className="text-muted-foreground mb-4">Select amount to top up</p>
          
          {/* Quick amounts */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {quickAmounts.map((amount) => (
              <button
                key={amount}
                onClick={() => setSelectedAmount(amount)}
                className={`p-4 rounded-xl font-bold text-lg transition-all ${
                  selectedAmount === amount
                    ? "gradient-primary text-primary-foreground shadow-glow"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                ฿{amount}
              </button>
            ))}
          </div>

          {/* Custom amount */}
          <Input
            label="Custom Amount"
            type="number"
            placeholder="Enter amount"
            prefix={<span className="font-bold">฿</span>}
            value={selectedAmount?.toString() || ""}
            onChange={(e) => setSelectedAmount(Number(e.target.value))}
          />

          {/* Payment method selection */}
          <div className="mt-6">
            <p className="text-sm font-medium mb-3">Pay with</p>
            <Card variant="outline" className="p-4 flex items-center gap-4 cursor-pointer border-primary">
              <CreditCard className="h-6 w-6 text-primary" />
              <div className="flex-1">
                <p className="font-medium">Visa •••• 4242</p>
              </div>
              <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                <Check className="h-3 w-3 text-primary-foreground" />
              </div>
            </Card>
          </div>

          <Button 
            size="lg" 
            className="w-full mt-6"
            disabled={!selectedAmount}
            onClick={handleTopUp}
          >
            Top Up ฿{selectedAmount?.toLocaleString() || 0}
          </Button>
        </div>
      </BottomSheet>

      {/* Success sheet */}
      <BottomSheet
        isOpen={showSuccessSheet}
        onClose={() => {
          setShowSuccessSheet(false);
          setSelectedAmount(null);
        }}
        title=""
      >
        <div className="p-6 text-center">
          <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
            <Check className="h-10 w-10 text-success" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Top-up Successful!</h2>
          <p className="text-muted-foreground mb-6">
            ฿{selectedAmount?.toLocaleString()} has been added to your wallet
          </p>
          <Button 
            size="lg" 
            className="w-full"
            onClick={() => {
              setShowSuccessSheet(false);
              setSelectedAmount(null);
            }}
          >
            Done
          </Button>
        </div>
      </BottomSheet>
    </div>
  );
}
