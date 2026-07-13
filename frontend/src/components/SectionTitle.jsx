import { motion } from "framer-motion";

function SectionTitle({ icon, title, subtitle }) {
    return (
        <motion.div
            initial={{ opacity:0,y:20 }}
            whileInView={{ opacity:1,y:0 }}
            transition={{ duration:.4 }}
            className="mb-6"
        >
            <h2 className="text-3xl font-bold flex items-center gap-3 text-slate-800">
                {icon}
                {title}
            </h2>

            {subtitle && (
                <p className="text-gray-500 mt-2">
                    {subtitle}
                </p>
            )}
        </motion.div>
    );
}

export default SectionTitle;