import React from "react";
import { BookOpen } from "lucide-react";
import { Card, CardContent } from "./Card";
import { useState } from "react";
import ContentDetalsModal from "./ContentDetalsModal";

export default function Schedule({ duration, frequency, content }) {
  // Determine the spacing of days based on schedule type
  const [selectedItem, setSelectedItem] = useState(null);

  const getDaysCount = (durationValue, frequencyValue) => {
    const dur = durationValue?.toLowerCase?.() || "1 week";
    const freq = frequencyValue?.toLowerCase?.() || "daily";

    let totalDays;
    switch (dur) {
      case "1 week":
        totalDays = 7;
        break;
      case "2 weeks":
        totalDays = 14;
        break;
      case "3 weeks":
        totalDays = 21;
        break;
      case "month":
      case "1 month":
        totalDays = 30;
        break;
      default:
        totalDays = 7;
    }

    switch (freq) {
      case "daily":
        return Array.from({ length: totalDays }, (_, i) => i + 1);
      case "every 2 days":
        return Array.from(
          { length: Math.ceil(totalDays / 2) },
          (_, i) => i * 2 + 1
        );
      case "weekly":
        return Array.from(
          { length: Math.ceil(totalDays / 7) },
          (_, i) => i * 7 + 1
        );
      default:
        return Array.from({ length: totalDays }, (_, i) => i + 1);
    }
  };
  const days = getDaysCount(duration, frequency);

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  // console.log("DURATION:", duration);
  // console.log("FREQUENCY:", frequency);
  // console.log("CONTENT LENGTH:", content.length);
  return (
    <div className="py-8">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-linear-to-br from-[#F3911D] via-[#C94BAA] to-[#840B86] rounded-xl mb-4">
          <BookOpen className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-bold mb-2 text-white">Content Schedule</h2>
        <p className="text-muted-foreground text-lg">
          See how your AI-generated content will be posted
        </p>
      </div>

      {/* Timeline */}
      <div className="relative mt-12">
        {/* Vertical Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-linear-to-b from-[#FFA500] via-[#FF5EAA] to-[#800080]"></div>

        {days.map((day, index) => {
          const item = content[index];
          return (
            <div key={day} className="relative mb-16">
              {/* Day Bubble */}
              <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-16 h-16 bg-linear-to-br from-[#F3911D] via-[#C94BAA] to-[#840B86] rounded-full border-4 border-background shadow-xl z-10">
                <span className="text-2xl font-extrabold text-white drop-shadow-sm">
                  {day}
                </span>
              </div>

              {/* Content Card */}
              <div className={day % 2 === 1 ? "text-right" : "col-start-2"}>
                <Card
                  className="inline-block max-w-md shadow-lg hover:shadow-xl transition-shadow"
                  onClick={() => setSelectedItem(item)}
                >
                  <CardContent className="p-5 flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-5 h-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm text-muted-foreground font-medium mb-1">
                        {item.content_type || "Content"}
                      </div>
                      <div className="font-semibold">{item.title}</div>
                      {item.caption && (
                        <div className="text-gray-400 text-sm mt-1">
                          {item.caption}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          );
        })}
      </div>

      {selectedItem && (
        <ContentDetalsModal
          item={selectedItem}
          handleCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
}
