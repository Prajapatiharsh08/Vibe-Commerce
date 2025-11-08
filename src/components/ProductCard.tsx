import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden border-border shadow-soft hover:shadow-medium transition-all duration-300">
        <div className="aspect-square overflow-hidden bg-secondary">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
        </div>
        <CardContent className="p-4">
          <span className="text-xs font-medium text-accent uppercase tracking-wide">
            {product.category}
          </span>
          <h3 className="font-semibold text-lg mt-1 text-foreground line-clamp-1">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {product.description}
          </p>
          <p className="text-2xl font-bold text-primary mt-3">
            ${product.price.toFixed(2)}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button
            onClick={() => addToCart(product)}
            className="w-full font-medium"
            size="lg"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
