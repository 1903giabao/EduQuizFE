import { useState } from "react";
import CreateClass from "../../services/api/class/createClass/api";
import { useAuth } from "../../context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

type Slot = {
  dayInWeek: string;
  startTime: string;
  endTime: string;
  location: string;
};

type AddClassForm = {
  className: string;
  description: string;
  startDate: string;
  endDate: string;
  slotsInWeek: number;
  slots: Slot[];
};

export default function AddClassModal({ onClose }) {
  const { user } = useAuth();
  const [form, setForm] = useState<AddClassForm>({
    className: "",
    description: "",
    startDate: "",
    endDate: "",
    slotsInWeek: 1,
    slots: [
      {
        dayInWeek: "Monday",
        startTime: "",
        endTime: "",
        location: "",
      },
    ],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!form.className.trim()) {
      errs.className = "Class name is required";
    }

    if (!form.startDate) {
      errs.startDate = "Start date is required";
    }

    if (!form.endDate) {
      errs.endDate = "End date is required";
    }

    form.slots.forEach((slot, i) => {
      if (!slot.startTime) {
        errs[`slot-${i}-startTime`] = "Start time required";
      }
      if (!slot.endTime) {
        errs[`slot-${i}-endTime`] = "End time required";
      }
      if (!slot.location.trim()) {
        errs[`slot-${i}-location`] = "Location required";
      }
    });

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const dayToNumber = (day: string): number => {
    const map: Record<string, number> = {
      Sunday: 0,
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
    };
    return map[day];
  };

  const toTimeOnly = (time: string): string => {
    return `${time}:00.000`;
  };

  const queryClient = useQueryClient();

  const createClass = useMutation({
    mutationFn: CreateClass,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
      onClose();
    },
  });

  const handleSubmit = async () => {
    if (!validate()) return;

    setSubmitting(true);

    try {
      createClass.mutate({
        name: form.className,
        description: form.description || null,
        teacherId: user.id,
        startDate: form.startDate,
        endDate: form.endDate,
        slotInDays: form.slots.map((s) => ({
          day: DAYS.indexOf(s.dayInWeek),
          startSlotTime: toTimeOnly(s.startTime),
          endSlotTime: toTimeOnly(s.endTime),
          location: s.location,
        })),
      });
    } catch (err) {
      console.error(err);
      alert("Failed to save class");
    } finally {
      setSubmitting(false);
    }
  };

  const updateField = <K extends keyof AddClassForm>(
    key: K,
    value: AddClassForm[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const addDays = (dateStr, days) => {
    const d = new Date(dateStr);
    d.setDate(d.getDate() + days);
    return d.toISOString().split("T")[0];
  };

  const updateDate = (key: "startDate" | "endDate", value: string) => {
    setForm((prev) => {
      let next = { ...prev, [key]: value };

      if (key === "startDate" && prev.endDate) {
        const minEndDate = addDays(value, 30);
        if (new Date(prev.endDate) <= new Date(minEndDate)) {
          next.endDate = "";
        }
      }

      if (key === "endDate" && prev.startDate) {
        const minEndDate = addDays(prev.startDate, 30);
        if (new Date(value) <= new Date(minEndDate)) {
          return prev;
        }
      }

      return next;
    });
  };

  const handleSlotsChange = (count) => {
    const num = Math.max(1, Number(count));

    setForm((prev) => {
      const slots = [...prev.slots];

      if (num > slots.length) {
        while (slots.length < num) {
          slots.push({
            dayInWeek: "Monday",
            startTime: "",
            endTime: "",
            location: "",
          });
        }
      } else {
        slots.length = num;
      }

      return { ...prev, slotsInWeek: num, slots };
    });
  };

  const toMinutes = (time) => {
    if (!time) return 0;
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
  };

  const updateSlot = (index: number, key: keyof Slot, value: string) => {
    setForm((prev) => {
      const slots = [...prev.slots];
      const slot = { ...slots[index], [key]: value };

      if (key === "endTime" && slot.startTime) {
        if (toMinutes(value) <= toMinutes(slot.startTime)) return prev;
      }

      if (key === "startTime" && slot.endTime) {
        if (toMinutes(slot.endTime) <= toMinutes(value)) {
          slot.endTime = "";
        }
      }

      slots[index] = slot;
      return { ...prev, slots };
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 w-[900px] max-w-[95vw] rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Add new class</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-black">
            ✕
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <Input
              label="Class name"
              value={form.className}
              onChange={(e) => updateField("className", e.target.value)}
              error={errors.className}
            />

            <Textarea
              label="Description"
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <Input
              label="Start date"
              type="date"
              value={form.startDate}
              onChange={(e) => updateDate("startDate", e.target.value)}
              error={errors.startDate}
            />

            <Input
              label="End date"
              type="date"
              min={form.startDate ? addDays(form.startDate, 31) : undefined}
              value={form.endDate}
              onChange={(e) => updateDate("endDate", e.target.value)}
              error={errors.endDate}
            />

            <Input
              label="Slots per week"
              type="number"
              min={1}
              max={7}
              value={form.slotsInWeek}
              onChange={(e) => {
                let value = Number(e.target.value);

                if (Number.isNaN(value)) return;

                if (value < 1) value = 1;
                if (value > 7) value = 7;

                handleSlotsChange(value);
              }}
              onKeyDown={(e) => {
                if (["-", "+", "e", "E", "."].includes(e.key)) {
                  e.preventDefault();
                }
              }}
              error={errors.endDate}
            />
          </div>
        </div>

        <div className="mt-8">
          <h3 className="mb-3 text-lg font-semibold">Weekly slots</h3>

          <div className="grid grid-cols-5 gap-3 text-sm font-medium text-gray-600 mb-2">
            <div>Day</div>
            <div>Start time</div>
            <div>End time</div>
            <div>Location</div>
            <div />
          </div>

          {form.slots.map((slot, index) => (
            <div key={index} className="grid grid-cols-5 gap-3 mb-3">
              <select
                className="rounded-lg border px-3 py-2"
                value={slot.dayInWeek}
                onChange={(e) => updateSlot(index, "dayInWeek", e.target.value)}
              >
                {DAYS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>

              <input
                type="time"
                className={`rounded-lg border px-3 py-2 ${
                  errors[`slot-${index}-startTime`] ? "border-red-500" : ""
                }`}
                value={slot.startTime}
                onChange={(e) => updateSlot(index, "startTime", e.target.value)}
              />

              <input
                type="time"
                className={`rounded-lg border px-3 py-2 ${
                  errors[`slot-${index}-endTime`] ? "border-red-500" : ""
                }`}
                min={slot.startTime}
                value={slot.endTime}
                onChange={(e) => updateSlot(index, "endTime", e.target.value)}
              />

              <input
                placeholder="Room / Location"
                className={`rounded-lg border px-3 py-2 ${
                  errors[`slot-${index}-location`] ? "border-red-500" : ""
                }`}
                value={slot.location}
                onChange={(e) => updateSlot(index, "location", e.target.value)}
              />

              <div />
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="rounded-lg bg-[#00adef] px-5 py-2 text-white disabled:opacity-50"
          >
            {submitting ? "Saving..." : "Save class"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Input({ label, error, ...props }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-600">
        {label}
      </label>
      <input
        {...props}
        className={`w-full rounded-lg border px-3 py-2 ${
          error ? "border-red-500" : ""
        }`}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

function Textarea({ label, ...props }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-600">
        {label}
      </label>
      <textarea
        {...props}
        rows={5}
        className="w-full resize-none rounded-lg border px-3 py-2"
      />
    </div>
  );
}
