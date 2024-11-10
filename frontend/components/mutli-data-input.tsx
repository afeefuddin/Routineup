"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function TagInput() {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
  };

  const addTag = () => {
    const trimmedInput = inputValue.trim();
    console.log(trimmedInput);
    const newValues = trimmedInput.split(",");
    if (trimmedInput && !tags.includes(trimmedInput)) {
      setTags([...tags, ...newValues]);
      setInputValue("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="flex gap-2">
        <Input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          placeholder="Type and press Enter or comma to add tags"
          className="flex-grow"
          name="emails"
        />
        <Button onClick={addTag}>Add Tag</Button>
      </div>{" "}
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag) => (
          <div
            key={tag}
            className="flex items-center bg-primary text-primary-foreground px-2 py-1 rounded-md"
          >
            <span>{tag}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-4 w-4 ml-1 hover:bg-primary-foreground hover:text-primary rounded-full"
              onClick={() => removeTag(tag)}
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Remove tag</span>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
