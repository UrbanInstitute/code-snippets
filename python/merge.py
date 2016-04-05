l1 = [{"foo": "x", "bar": "y"},{"foo": "a", "bar":"b"}]
l2 = [{"foo":"x", "baz": "d"},{"foo":"a", "baz":"e"}]

def merge_lists(l1, l2, key):
  merged = {}
  for item in l1+l2:
    if item[key] in merged:
      merged[item[key]].update(item)
    else:
      merged[item[key]] = item
  return [v for (k, v) in merged.items()]

print merge_lists(l1,l2,"foo")