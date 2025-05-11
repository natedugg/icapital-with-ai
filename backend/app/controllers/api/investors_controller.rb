module Api
  class InvestorsController < ApplicationController
    before_action :set_investor, only: [:show, :update]

    # GET /api/investors
    def index
      investors = Investor.all
      render json: investors, include: :documents
    end

    # GET /api/investors/:id
    def show
      render json: @investor, include: :documents
    end

    # POST /api/investors
    def create
      investor = Investor.new(investor_params)
      if investor.save
        save_uploaded_files(investor)
        render json: { message: 'Investor and documents saved' }, status: :created
      else
        render json: { errors: investor.errors.full_messages }, status: :unprocessable_entity
      end
    end

    # PUT /api/investors/:id
    def update
      if @investor.update(investor_params)
        remove_unkept_files
        save_uploaded_files(@investor)
        render json: { message: 'Investor updated; removed and saved documents' }
      else
        render json: { errors: @investor.errors.full_messages }, status: :unprocessable_entity
      end
    end

    private

    def set_investor
      @investor = Investor.find(params[:id])
    end

    def investor_params
      params.require(:investor).permit(
        :first_name, :last_name, :date_of_birth,
        :phone_number, :street_address, :state, :zip_code
      )
    end

    # Remove files unchecked in form and clean up empty directories
    def remove_unkept_files
      return unless params[:remove_file_ids]

      upload_dir = Rails.root.join('public', 'uploads', @investor.id.to_s)
      Array(params[:remove_file_ids]).each do |fid|
        doc = @investor.documents.find_by(id: fid)
        next unless doc
        file_path = doc.file_path
        File.delete(file_path) if File.exist?(file_path)
        doc.destroy
      end
      # Remove directory if empty
      if Dir.exist?(upload_dir) && Dir.empty?(upload_dir)
        FileUtils.rmdir(upload_dir)
      end
    end

    # Save newly uploaded files
    def save_uploaded_files(investor)
      return unless params[:files]

      params[:files].each do |uploaded|
        filename = uploaded.original_filename
        dir      = Rails.root.join('public', 'uploads', investor.id.to_s)
        FileUtils.mkdir_p(dir)
        path = dir.join(filename)
        File.open(path, 'wb') { |f| f.write(uploaded.read) }
        investor.documents.create!(file_name: filename, file_path: path.to_s)
      end
    end
  end
end
