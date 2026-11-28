import { DatePicker, Label, DateField, Calendar } from "@heroui/react";
import { getLocalTimeZone, type DateValue } from "@internationalized/date";

interface DatesProps {
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
}

export default function Dates({ date, setDate }: DatesProps) {
  function setDateAsString(dateValue: DateValue | null) {
    if (dateValue === null) return
    const dateValueAsDate = dateValue.toDate(getLocalTimeZone());
    const stringDate = new Date(dateValueAsDate).toLocaleDateString("LT");
    
    console.log("Prev date: ", date);
    setDate(stringDate);
    console.log("New date: ", stringDate)
  }

  return (
    <DatePicker className="w-full md:w-72" name="date" onChange={(date) => setDateAsString(date)}>
      {/* <Label>Date</Label> */}
      <DateField.Group fullWidth>
        <DateField.Input className="text-lg">{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
        <DateField.Suffix>
          <DatePicker.Trigger>
            <DatePicker.TriggerIndicator />
          </DatePicker.Trigger>
        </DateField.Suffix>
      </DateField.Group>
      <DatePicker.Popover>
        <Calendar aria-label="Event date">
          <Calendar.Header>
            <Calendar.YearPickerTrigger>
              <Calendar.YearPickerTriggerHeading />
              <Calendar.YearPickerTriggerIndicator />
            </Calendar.YearPickerTrigger>
            <Calendar.NavButton slot="previous" />
            <Calendar.NavButton slot="next" />
          </Calendar.Header>
          <Calendar.Grid>
            <Calendar.GridHeader>
              {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
            </Calendar.GridHeader>
            <Calendar.GridBody>{(date) => <Calendar.Cell date={date} />}</Calendar.GridBody>
          </Calendar.Grid>
          <Calendar.YearPickerGrid>
            <Calendar.YearPickerGridBody>
              {({ year }) => <Calendar.YearPickerCell year={year} />}
            </Calendar.YearPickerGridBody>
          </Calendar.YearPickerGrid>
        </Calendar>
      </DatePicker.Popover>
    </DatePicker>
  );
}