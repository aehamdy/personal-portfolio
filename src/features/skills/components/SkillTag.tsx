type SkillTagProps = {
  name: string;
};

function SkillTag({ name }: SkillTagProps) {
  return (
    <span className="inline-flex items-center px-3 py-1.5 font-body text-sm text-foreground group-hover:text-accent-contrast bg-surface group-hover:bg-accent border border-border rounded-full transition-all duration-slower">
      {name}
    </span>
  );
}

export default SkillTag;
