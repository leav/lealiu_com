# json_files = dir.glob(file.join("**", "*.json"))

# json_files.each do |json_file|
  # /^(.*)\.json$/ =~ json_file
  # asset_files = dir.glob("#{$1}.*")
  # p asset_files
  # asset_files.delete_if{|asset_file| asset_file == json_file}
  # p asset_files
# end

require 'dimensions'
require 'json'

module Publish
	ASSETS_FOLDER = 'assets'
	OUTPUT_PATH = 'javascripts/assets.js'

	TILING_WIDTH = 5
	TILINE_HEIGHT = 3
	
	module_function
	# run the module
	def print_asset_manifest
		assets, tags, galleryTags = create_assets
		File.open(OUTPUT_PATH,'w') do |file|
		  script = "$tags = " + JSON.pretty_generate(tags) + "\n" +
			"$galleryTags = " + JSON.pretty_generate(galleryTags) + "\n" +
			"$assets = " + JSON.pretty_generate(assets)
		  file.write(script)
		  print script
		end
	end
	
	#
	# create_assets functions
	#
	
	def create_assets
		assets = []
		tags = []
		galleryTags = []
		samples = {}
		Dir.chdir(ASSETS_FOLDER) do
			Dir.glob(File.join("**", "*.*")) do |file_name|
				type = get_type(file_name)
				if (type)
					asset = {}
					asset['type'] = type
					asset['name'] = File.basename(file_name, ".*")
					asset['path'] = File.join(ASSETS_FOLDER, file_name)
					asset['tags'] = get_tags(asset['path'])
					tags |= asset['tags']
					if asset['tags'].include?('Gallery')
						galleryTags |= asset['tags']
					end
					#asset['positions'] = get_positions(file_name)
					dimensions = get_dimensions(file_name)
					asset['width'] = dimensions[0]
					asset['height'] = dimensions[1]
					if (type == 'image')
						assets.push asset
					else
						samples[asset['name']] = asset
					end
				end
			end
		end
		assets.each do |asset|
			sample = samples[asset['name'] + '_s']
			if sample
				asset['sample'] = sample
			end
		end
		galleryTags.delete('Gallery');
		return assets, tags.sort, galleryTags.sort
	end
	
	def get_tags(file_path)
		result = file_path.scan(/(?<=\[).*?(?=\])/)
		result |= file_path.scan(/(?<=\/).*?(?=\/)/)
		# result = []
		# TAGS.each do |tag|
			# /\[(.*?)\]/.match(file_name)
				# result.push(tag)
			# end
		# end
		# return result
	end
	
	def get_positions(file_name)
		result = {}
		TAGS.each do |tag|
			if Regexp.new("\\[#{tag},(\\d+),(\\d+),(\\d+)\\]") =~ file_name
				result[tag] = {'page' => $1.to_i, 'x' => $2.to_i, 'y' => $3.to_i}
			end
		end
		return result
	end
  
  def get_type(file_name)
		if /_s\.\w+$/ =~ file_name
			return 'sample'
    elsif Dimensions.dimensions(file_name) != nil
      return 'image'
    else
      return nil
    end
  end
  
  def get_dimensions(file_name)
    dimensions = Dimensions.dimensions(file_name)
    if dimensions != nil
      return dimensions
    else
      return [0, 0]
    end
  end
	
	#
	# create_tiling functions
	#
	
	def create_tiling(assets)
		
	end
	
	def find_assets_with_tag(assets, tag)
		results = []
		assets.each do |asset|
			if asset['tags'].include?(tag)
				results.push(asset)
			end
		end
		return results
	end
	
end

Publish.print_asset_manifest
`PAUSE`