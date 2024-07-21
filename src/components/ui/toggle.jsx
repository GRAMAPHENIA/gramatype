"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-3",
        sm: "h-9 px-2.5",
        lg: "h-11 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Toggle = React.forwardRef(({ className, variant, size, keyChar, ...props }, ref) => {
  const [isOn, setIsOn] = React.useState(false);

  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (keyChar && event.key.toLowerCase() === keyChar.toLowerCase()) {
        setIsOn(true);
      }
    };

    const handleKeyUp = (event) => {
      if (keyChar && event.key.toLowerCase() === keyChar.toLowerCase()) {
        setIsOn(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [keyChar]);

  return (
    <TogglePrimitive.Root
      ref={ref}
      pressed={isOn}
      onPressedChange={setIsOn}
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    >
      {keyChar ? keyChar.toUpperCase() : '?'}
    </TogglePrimitive.Root>
  );
});

Toggle.displayName = TogglePrimitive.Root.displayName

const App = () => {
  const keys = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '=', '[', ']', '\\', ';', "'", ',', '.', '/', '`', '~'
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {keys.map((key) => (
        <Toggle key={key} keyChar={key} className="w-12 h-12" />
      ))}
    </div>
  );
}

export default App;
export { Toggle, toggleVariants }
