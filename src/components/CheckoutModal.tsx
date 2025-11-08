import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalAmount: number;
  customerName: string;
  customerEmail: string;
}

const CheckoutModal = ({
  isOpen,
  onClose,
  totalAmount,
  customerName,
  customerEmail,
}: CheckoutModalProps) => {
  const timestamp = new Date().toLocaleString();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="mx-auto mb-4"
          >
            <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-3">
              <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400" />
            </div>
          </motion.div>
          <DialogTitle className="text-center text-2xl">
            Order Successful!
          </DialogTitle>
          <DialogDescription className="text-center">
            Thank you for your purchase
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          <div className="bg-secondary p-4 rounded-lg space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Customer Name:</span>
              <span className="font-medium">{customerName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Email:</span>
              <span className="font-medium">{customerEmail}</span>
            </div>
            <div className="border-t border-border pt-2 mt-2">
              <div className="flex justify-between">
                <span className="font-semibold">Total Amount:</span>
                <span className="text-xl font-bold text-primary">
                  ${totalAmount.toFixed(2)}
                </span>
              </div>
            </div>
            <div className="text-xs text-muted-foreground text-center pt-2">
              {timestamp}
            </div>
          </div>

          <Button onClick={onClose} className="w-full" size="lg">
            Continue Shopping
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;
