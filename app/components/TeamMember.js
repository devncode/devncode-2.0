import Image from "next/image";
import PropTypes from "prop-types";

export default function TeamMember({ name, role, description, image }) {
  return (
    <div className="bg-white dark:bg-white/5 p-6 md:p-8 rounded-lg border border-black/10 dark:border-white/10 transition-all duration-200 hover:border-terracotta dark:hover:border-terracotta hover:shadow-lg text-center h-full">
      <div className="w-24 h-24 mx-auto mb-4 relative rounded-full overflow-hidden bg-black/5 dark:bg-white/10 flex items-center justify-center">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 96px, 96px"
          />
        ) : (
          <svg
            className="w-12 h-12 text-black/20 dark:text-white/20"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        )}
      </div>
      <div>
        <h3 className="text-xl font-space-grotesk font-bold text-custom-black dark:text-beige mb-2">
          {name}
        </h3>
        <p className="text-terracotta font-semibold text-sm mb-3">
          {role}
        </p>
        <p className="text-xs text-custom-black/60 dark:text-beige/60 italic">
          {description}
        </p>
      </div>
    </div>
  );
}

TeamMember.propTypes = {
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string,
};
