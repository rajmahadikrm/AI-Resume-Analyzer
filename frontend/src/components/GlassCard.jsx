import { motion } from "framer-motion";

function GlassCard({ children }) {
    return (
        <motion.div
            initial={{ opacity:0,scale:.95 }}
            whileInView={{ opacity:1,scale:1 }}
            transition={{ duration:.4 }}
            className="
            bg-white/80
            backdrop-blur-xl
            rounded-3xl
            shadow-xl
            border
            border-white/30
            p-6
            "
        >
            {children}
        </motion.div>
    );
}

export default GlassCard;