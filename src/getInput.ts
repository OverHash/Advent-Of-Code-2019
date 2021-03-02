export function getInput(script: LuaSourceContainer): string {
	const parent = script.Parent;
	if (!parent) {
		throw `Expected ${script.GetFullName()} to have a parent.`;
	}

	const input = parent.FindFirstChild('input');
	if (!(input && input.IsA("ModuleScript"))) {
		throw `Expected ${parent.GetFullName()}.input to exist and be a ModuleScript`;
	}

	return (require(input) as { default: string}).default;
}
