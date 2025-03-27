import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import React, { useState, ImgHTMLAttributes, ReactNode } from 'react';
import Image from 'next/image';

const avatarVariants = cva(
  "relative inline-flex items-center justify-center rounded-full overflow-hidden bg-gray-200",
  {
    variants: {
      size: {
        small: 'w-8 h-8',
        medium: 'w-12 h-12',
        large: 'w-16 h-16'
      },
    },
    defaultVariants: {
      size: "medium",
    },
  }
)

interface AvatarRootProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof avatarVariants> {
  children: React.ReactNode;
  className?: string;
}

const Avatar = ({
  children,
  className,
  size = 'medium',
  ...props
}: AvatarRootProps) => {

  return (
    <div
      className={cn(avatarVariants({ size, className }))}
      {...props}
    >
      {children}
    </div>
  );
};

interface AvatarImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  children?: ReactNode;
  className?: string;
  width?: number;
  height?: number;
  fill?: boolean;
}

Avatar.Image = ({
  src,
  alt,
  children,
  className = '',
  onError,
  width,
  height,
  fill = false,
  ...props
}: AvatarImageProps) => {
  const [imageError, setImageError] = useState(false);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setImageError(true);
    onError?.(e);
  };

  if (imageError) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        {children || 'No Image'}
      </div>
    );
  }

  return (
    <>
      <Image
        src={src || ''}
        alt={alt || ''}
        onError={handleError}
        className={cn('w-full h-full object-cover', className)}
        width={width}
        height={height}
        fill={fill}
        {...props}
      />
      {!imageError && children && (
        <div className="hidden">{children}</div>
      )}
    </>
  );
};

Avatar.Fallback = ({
  children,
  className = ''
}: {
  children: React.ReactNode,
  className?: string
}) => {
  return (
    <div
      className={cn('w-full h-full flex items-center justify-center bg-gray-300 text-gray-700', className)}
    >
      {children}
    </div>
  );
};

export default Avatar;