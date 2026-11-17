import { FamilyHistoryEntryResponse } from "@/types/family-history-type";

import { DetailField } from "../ui/detail-field";
import { ModalCard } from "../ui/modal-card";

interface FamilyHistoryCardProps {
  entry: FamilyHistoryEntryResponse;
  onEdit: (entry: FamilyHistoryEntryResponse) => void;
  onDelete: (entryId: number) => void;
}

export const FamilyHistoryCard = ({
  entry,
  onEdit,
  onDelete,
}: FamilyHistoryCardProps) => {
  return (
    <ModalCard
      title={entry.relative}
      types="secondary"
      onClose={() => onDelete(entry.id)}
      onEdit={() => onEdit(entry)}
    >
      <DetailField label="Diagnose" value={entry.diagnosis} />
      <DetailField label="Kommentar" value={entry.comment} />
    </ModalCard>
  );
};
