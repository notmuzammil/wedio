import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { 
  Star, 
  MessageSquare, 
  Heart,
  Calendar,
  User
} from "lucide-react";

interface ReviewFormProps {
  vendorId: string;
  vendorName: string;
  onReviewSubmit?: (review: ReviewData) => void;
}

interface ReviewData {
  vendorId: string;
  customerName: string;
  rating: number;
  comment: string;
  eventType: string;
  eventDate: string;
}

const ReviewForm = ({ vendorId, vendorName, onReviewSubmit }: ReviewFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [customerName, setCustomerName] = useState("");
  const [comment, setComment] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const eventTypes = [
    "Wedding Ceremony",
    "Reception",
    "Engagement",
    "Mehndi",
    "Baraat",
    "Valima",
    "Anniversary",
    "Birthday Party",
    "Other"
  ];

  const handleStarClick = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const handleStarHover = (selectedRating: number) => {
    setHoverRating(selectedRating);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  const resetForm = () => {
    setRating(0);
    setHoverRating(0);
    setCustomerName("");
    setComment("");
    setEventType("");
    setEventDate("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!rating) {
      toast.error("Please select a rating");
      return;
    }

    if (!customerName.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (!comment.trim()) {
      toast.error("Please write a review");
      return;
    }

    if (!eventType) {
      toast.error("Please select event type");
      return;
    }

    if (!eventDate) {
      toast.error("Please select event date");
      return;
    }

    setIsSubmitting(true);

    try {
      const reviewData: ReviewData = {
        vendorId,
        customerName: customerName.trim(),
        rating,
        comment: comment.trim(),
        eventType,
        eventDate
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (onReviewSubmit) {
        onReviewSubmit(reviewData);
      }

      toast.success("Review submitted successfully!");
      resetForm();
      setIsOpen(false);
    } catch (error) {
      toast.error("Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRatingLabel = (rating: number) => {
    switch (rating) {
      case 1: return "Poor";
      case 2: return "Fair";
      case 3: return "Good";
      case 4: return "Very Good";
      case 5: return "Excellent";
      default: return "Select Rating";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="hero" className="flex items-center space-x-2">
          <Star className="h-4 w-4" />
          <span>Write a Review</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5 text-rose-gold" />
            <span>Write a Review for {vendorName}</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Rating Selection */}
          <div className="space-y-3">
            <Label className="text-lg font-semibold">Rate your experience</Label>
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={`p-1 transition-colors ${
                      star <= (hoverRating || rating)
                        ? 'text-yellow-500'
                        : 'text-gray-300 hover:text-yellow-400'
                    }`}
                    onClick={() => handleStarClick(star)}
                    onMouseEnter={() => handleStarHover(star)}
                    onMouseLeave={handleStarLeave}
                  >
                    <Star className="h-8 w-8 fill-current" />
                  </button>
                ))}
              </div>
              <span className="text-foreground font-medium ml-3">
                {getRatingLabel(hoverRating || rating)}
              </span>
            </div>
          </div>

          {/* Customer Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="customerName">Your Name *</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="customerName"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Enter your name"
                  className="pl-10 border-rose-gold/30 focus:border-rose-gold"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Event Date *</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="pl-10 border-rose-gold/30 focus:border-rose-gold"
                  required
                />
              </div>
            </div>
          </div>

          {/* Event Type */}
          <div className="space-y-2">
            <Label>Event Type *</Label>
            <Select value={eventType} onValueChange={setEventType}>
              <SelectTrigger className="border-rose-gold/30 focus:border-rose-gold">
                <SelectValue placeholder="Select the type of event" />
              </SelectTrigger>
              <SelectContent>
                {eventTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Review Comment */}
          <div className="space-y-2">
            <Label htmlFor="comment">Your Review *</Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience with this vendor. What did you like? How was their service?"
              className="min-h-[120px] border-rose-gold/30 focus:border-rose-gold resize-none"
              required
            />
            <div className="text-right text-sm text-muted-foreground">
              {comment.length}/500
            </div>
          </div>

          {/* Guidelines */}
          <Card className="border-rose-gold/20 bg-rose-gold/5">
            <CardContent className="p-4">
              <h4 className="font-semibold text-foreground mb-2">Review Guidelines</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Be honest and fair in your review</li>
                <li>• Focus on your experience with the vendor</li>
                <li>• Avoid personal attacks or inappropriate language</li>
                <li>• Include specific details about the service provided</li>
              </ul>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="hero"
              disabled={isSubmitting || !rating || !customerName.trim() || !comment.trim() || !eventType || !eventDate}
              className="min-w-[120px]"
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Submitting...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Heart className="h-4 w-4" />
                  <span>Submit Review</span>
                </div>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewForm;
