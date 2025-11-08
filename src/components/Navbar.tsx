import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Package, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

const Navbar = () => {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-background border-b shadow-soft">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2"
            >
              <div className="bg-primary p-2 rounded-lg">
                <Package className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold text-primary">Vibe Commerce</span>
            </motion.div>
          </Link>

          <div className="flex items-center gap-4">
            <Link to="/products">
              <Button
                variant={isActive("/products") ? "default" : "ghost"}
                className="font-medium"
              >
                Products
              </Button>
            </Link>
            
            <Link to="/add-product">
              <Button
                variant={isActive("/add-product") ? "default" : "ghost"}
                className="font-medium"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </Link>

            <Link to="/cart">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant={isActive("/cart") ? "default" : "ghost"}
                  className="relative font-medium"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-accent text-accent-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </Button>
              </motion.div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
