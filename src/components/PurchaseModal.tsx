import { useState } from 'react';
import { X, MessageCircle, CreditCard, Phone } from 'lucide-react';
import { Product } from '../lib/supabase';

interface PurchaseModalProps {
  product: Product;
  onClose: () => void;
}

export default function PurchaseModal({ product, onClose }: PurchaseModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [showPaymentInfo, setShowPaymentInfo] = useState(false);

  const whatsappNumber = '+2348036226669';
  const accountNumber = '0123456789';
  const bankName = 'First Bank of Nigeria';
  const accountName = 'Olupo Agriculture';

  const totalAmount = product.price * quantity;

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      `Hello! I'm interested in purchasing:\n\n` +
      `Product: ${product.name}\n` +
      `Quantity: ${quantity}\n` +
      `Total Amount: ₦${totalAmount.toLocaleString()}\n\n` +
      `Please provide more information.`
    );
    window.open(`https://wa.me/${whatsappNumber.replace(/\+/g, '')}?text=${message}`, '_blank');
  };

  const handlePaymentConfirmation = () => {
    const message = encodeURIComponent(
      `I have made a transfer for:\n\n` +
      `Product: ${product.name}\n` +
      `Quantity: ${quantity}\n` +
      `Amount: ₦${totalAmount.toLocaleString()}\n\n` +
      `Please confirm receipt.`
    );
    window.open(`https://wa.me/${whatsappNumber.replace(/\+/g, '')}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Purchase {product.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
            <h3 className="font-bold text-xl text-gray-900 mb-2">{product.name}</h3>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold text-green-600">
                ₦{product.price.toLocaleString()}
              </span>
              <span className="text-gray-600">{product.unit}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity
            </label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none text-lg"
            />
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium text-gray-700">Total Amount:</span>
              <span className="text-3xl font-bold text-green-600">
                ₦{totalAmount.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleWhatsAppClick}
              className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white px-6 py-4 rounded-xl hover:bg-green-700 transition-all transform hover:scale-105 shadow-lg"
            >
              <MessageCircle className="h-5 w-5" />
              <span className="font-semibold">Chat on WhatsApp</span>
            </button>

            <button
              onClick={() => setShowPaymentInfo(!showPaymentInfo)}
              className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-4 rounded-xl hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg"
            >
              <CreditCard className="h-5 w-5" />
              <span className="font-semibold">
                {showPaymentInfo ? 'Hide' : 'Show'} Payment Info
              </span>
            </button>
          </div>

          {showPaymentInfo && (
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 space-y-4 animate-fade-in">
              <h3 className="font-bold text-lg text-gray-900 mb-4">Bank Transfer Details</h3>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Bank Name</p>
                  <p className="font-semibold text-gray-900">{bankName}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Account Number</p>
                  <p className="font-semibold text-gray-900 text-lg">{accountNumber}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Account Name</p>
                  <p className="font-semibold text-gray-900">{accountName}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Amount to Transfer</p>
                  <p className="font-bold text-green-600 text-2xl">₦{totalAmount.toLocaleString()}</p>
                </div>
              </div>

              <button
                onClick={handlePaymentConfirmation}
                className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white px-6 py-4 rounded-xl hover:bg-green-700 transition-all mt-4"
              >
                <Phone className="h-5 w-5" />
                <span className="font-semibold">I've Transferred - Confirm via WhatsApp</span>
              </button>

              <p className="text-sm text-gray-600 text-center">
                After transferring, click the button above to notify us via WhatsApp
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
