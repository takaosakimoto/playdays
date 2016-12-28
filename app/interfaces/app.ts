interface Filter {
  focused: Array<number>,
  selected: Array<number>,
}

export interface IDiretoryFilter {
  district: Filter,
  category: Filter,
  tag: Filter,
}

export class DiretoryFilter implements IDiretoryFilter {
  district = {focused: [], selected: []};
  category = {focused: [], selected: []}
  tag = {focused: [], selected: []}
}
